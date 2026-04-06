import { faker } from '@faker-js/faker';
import * as fs   from 'fs';
import * as path from 'path';

// ─────────────────────────────────────────────────────────────────────────────
// loadTestData
//
// Reads a JSON file at RUNTIME based on a test name string.
// This is the key difference from a static import:
//   - Static import: resolved once when the file is first loaded by Node
//   - fs.readFileSync: resolved each time the function is called, with
//     whatever path string you pass in
//
// path.resolve builds an absolute path so it works regardless of
// which directory Node was started from.
//
// 'unknown' return type: we don't know the shape of every test data file.
// The caller is responsible for knowing what fields to expect.
// Returning 'unknown' forces the caller to handle it explicitly rather
// than assuming a shape that might not be there.
// ─────────────────────────────────────────────────────────────────────────────
function extractTestCaseName(testTitle: string): string {
  // 'TC_001 — register new user'  →  'TC_001'
  // 'Login — valid credentials'   →  'Login'
  // Takes everything before the first space or dash
  return testTitle.split(/[\s—–-]/)[0].trim();
}

function loadTestData(testName: string): Record<string, unknown> {
  // Build the file path from the test name using your naming convention:
  //   testName = 'TC_001'  →  filename = 'TD_TC_001.json'
  //   testName = 'Login'   →  filename = 'TD_Login.json'

  const fileName = `TD_${testName.split(' ')[1]}.json`;
  const filePath = path.resolve(process.cwd(), 'test_Data', fileName);

  // Check if the file exists before trying to read it.
  // Without this check, fs.readFileSync throws a cryptic ENOENT error.
  // With this check, you get a clear message pointing to the exact file.
  if (!fs.existsSync(filePath)) {
    console.warn(`[DataGenerator] No test data file found: ${fileName} — using defaults only`);
    return {};
  }

  // fs.readFileSync returns a Buffer or string — JSON.parse converts it
  // to a plain JS object. 'utf-8' ensures it's read as text not binary.
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// dynamicFields
//
// Generates fake data using faker. Returns a plain object.
// 'overrides' lets the caller replace specific fields:
//   dynamicFields({ username: 'fixed_name' })
//   → username is 'fixed_name', password is still random
//
// The spread order matters:
//   { ...generated, ...overrides }
//   Overrides come LAST so they win over generated values.
// ─────────────────────────────────────────────────────────────────────────────
function dynamicFields(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    username: faker.internet.username(),
    password: faker.internet.password({ length: 12 }),
    email:    faker.internet.email(),
    ...overrides,   // caller's values override generated ones
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// generateData — the main export
//
// Merges three layers in priority order (lowest to highest):
//
//   Layer 1 — staticData   : what's in the JSON file (base, stable values)
//   Layer 2 — dynamicFields: faker-generated values
//   Layer 3 — overrides    : caller-supplied values (highest priority)
//
// Spread order: later spreads win over earlier ones.
//   { ...staticData, ...dynamic, ...overrides }
//   If staticData has username: 'admin' and dynamic has username: 'faker_xyz',
//   the result has username: 'faker_xyz' because dynamic comes after.
//   If overrides has username: 'fixed', that wins over both.
//
// testName: matches your file naming convention exactly.
//   Pass the test case name and it loads TD_<testName>.json automatically.
// ─────────────────────────────────────────────────────────────────────────────

function toStringRecord(obj: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in obj) {
    result[key] = String(obj[key]);
  }

  return result;
}
export function generateData(
  testName: string,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
 // const testCaseName = extractTestCaseName(testTitle);
  const staticData = loadTestData(testName);
  const dynamic    = dynamicFields(overrides);
  console.log(dynamic);

  return {
    ...toStringRecord(staticData),   // base values from JSON
    ...toStringRecord(dynamic),      // faker values override static ones
    ...toStringRecord(overrides),    // explicit overrides win over everything
  };
}