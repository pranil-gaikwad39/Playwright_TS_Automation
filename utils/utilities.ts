import test, { Page, TestInfo } from '@playwright/test';
import { log } from './logger';
// import { generateAggregateA11yHtmlReport } from './convert_axe_report_into_html';
// import { AxeBuilder } from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';



// ─────────────────────────────────────────────────────────────────────────────
// RUNTIME DATA STORE
// ─────────────────────────────────────────────────────────────────────────────
const dict: Record<string, any> = {};

// ─────────────────────────────────────────────────────────────────────────────
// SCREENSHOT MODE RESOLUTION
// ─────────────────────────────────────────────────────────────────────────────

export function resolveScreenshotMode(testInfo: TestInfo): string {
    const projectLevelConfig = testInfo.config.projects[0]?.use?.screenshot;
    const globalLevelConfig  = (testInfo.config as any).use?.screenshot;
    const resolvedConfig     = projectLevelConfig ?? globalLevelConfig;

    if (!resolvedConfig) return 'off';
    if (typeof resolvedConfig === 'string') return resolvedConfig;
    if (typeof resolvedConfig === 'object' && 'mode' in resolvedConfig) return (resolvedConfig as { mode: string }).mode;
    return 'off';
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT ROOT DIRECTORY RESOLUTION
// ─────────────────────────────────────────────────────────────────────────────

export function resolveProjectRootDirectory(startingDirectory: string): string {
    const parentDirectory = path.dirname(startingDirectory);
    const packageJsonPath = path.join(startingDirectory, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
        return startingDirectory;
    } else if (parentDirectory === startingDirectory) {
        throw new Error('Project root directory could not be found — no package.json located in any parent directory.');
    } else {
        return resolveProjectRootDirectory(parentDirectory);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREENSHOT ATTACHMENT LABEL BUILDER
// ─────────────────────────────────────────────────────────────────────────────

export function buildScreenshotAttachmentLabel(screenshotTag: string): string {
    const isAssertionFailure = /^ASSERT_FAILED/i.test(screenshotTag);
    const actionWordMatch    = isAssertionFailure ? ['', 'FAILED'] : screenshotTag.match(/^([a-zA-Z]+)/);
    const actionWord         = actionWordMatch ? actionWordMatch[1] : 'action';
    let   elementDescription = '';

    const namedAttributeMatch = screenshotTag.match(/"name"\s*:\s*"([^"]+)"/);
    if (namedAttributeMatch) elementDescription = namedAttributeMatch[1].trim().split(/\s+/).slice(0, 3).join(' ').replace(/[^a-z0-9\s]/gi, '').trim();

    if (!elementDescription) { const m = screenshotTag.match(/getBy\w+\(\["([^"]+)"/);     if (m) elementDescription = m[1].trim().split(/\s+/).slice(0, 3).join(' ').replace(/:$/, ''); }
    if (!elementDescription) { const m = screenshotTag.match(/[@#]id[='"]+([a-z0-9_-]+)/i); if (m) elementDescription = m[1]; }
    if (!elementDescription) { const m = screenshotTag.match(/getBy([A-Z][a-z]+)/);         if (m) elementDescription = m[1]; }
    if (!elementDescription && /locator/i.test(screenshotTag)) elementDescription = 'locator';

    return `Screenshot attached : ${elementDescription ? `${actionWord} - ${elementDescription}` : actionWord}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE SCREENSHOT CAPTURE & ATTACHMENT  (used internally by the fixture)
// Respects playwright screenshot mode config. Non-fatal on failure.
// ─────────────────────────────────────────────────────────────────────────────

export async function captureAndAttachPageScreenshot(
    page: Page,
    screenshotTag: string,
    testInfo: TestInfo,
): Promise<void> {
    try {
        const screenshotMode = resolveScreenshotMode(testInfo);
        if (screenshotMode === 'off' || screenshotMode === 'only-on-failure') return;

        const screenshotBuffer = await page.screenshot({ fullPage: false });
        const attachmentLabel  = buildScreenshotAttachmentLabel(screenshotTag);
        await testInfo.attach(attachmentLabel, { body: screenshotBuffer, contentType: 'image/png' });
        await log('INFO', `[${testInfo.title}] ${attachmentLabel}`);
    } catch (captureError) {
        await log('ERROR', `[${testInfo.title}] Screenshot capture failed for tag="${screenshotTag}". Test execution continues. Reason: ${captureError}`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUAL FULL-PAGE SCREENSHOT  (called explicitly in test steps)
// ─────────────────────────────────────────────────────────────────────────────

export async function takeScreenshot(page: Page, testInfo: TestInfo, screenshotName: string): Promise<void> {
    const screenshot = await page.screenshot();
    await testInfo.attach(screenshotName, {
        body:        screenshot,
        contentType: 'image/png',
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUAL ELEMENT-SCOPED SCREENSHOT  (called explicitly in test steps)
// ─────────────────────────────────────────────────────────────────────────────

export async function takePartialScreenshot(page: Page, testInfo: TestInfo, selector: string, screenshotName: string): Promise<void> {
    const element = await page.$(selector);
    if (element) {
        const screenshot = await element.screenshot();
        await testInfo.attach(screenshotName, {
            body:        screenshot,
            contentType: 'image/png',
        });
    } else {
        console.warn(`Element with selector "${selector}" not found for screenshot.`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// HUMAN-READABLE SELECTOR LABEL RESOLVER
// ─────────────────────────────────────────────────────────────────────────────

export function resolveReadableSelectorLabel(selectorExpression: string): string {
    try {
        const roleMatch = selectorExpression.match(/getByRole\(\[?"?([^",\]]+)"?(?:,\s*(\{.*?\}))?\]?\)/s);
        if (roleMatch) {
            const roleName    = roleMatch[1].trim();
            const roleOptions = roleMatch[2];
            if (roleOptions) {
                try {
                    const parsedOptions = JSON.parse(roleOptions);
                    if (parsedOptions.name) return `${roleName} "${parsedOptions.name}"`;
                } catch { }
            }
            return roleName;
        }

        const byLabelMatch = selectorExpression.match(/getByLabel\(\["([^"]+)"/);
        if (byLabelMatch) return `field labeled "${byLabelMatch[1]}"`;

        const byPlaceholderMatch = selectorExpression.match(/getByPlaceholder\(\["([^"]+)"/);
        if (byPlaceholderMatch) return `field with placeholder "${byPlaceholderMatch[1]}"`;

        const byTextMatch = selectorExpression.match(/getByText\(\["([^"]+)"/);
        if (byTextMatch) return `element with text "${byTextMatch[1]}"`;

        const byTestIdMatch = selectorExpression.match(/getByTestId\(\["([^"]+)"/);
        if (byTestIdMatch) return `element [data-testid="${byTestIdMatch[1]}"]`;

        const byAltTextMatch = selectorExpression.match(/getByAltText\(\["([^"]+)"/);
        if (byAltTextMatch) return `image with alt text "${byAltTextMatch[1]}"`;

        const byTitleMatch = selectorExpression.match(/getByTitle\(\["([^"]+)"/);
        if (byTitleMatch) return `element with title "${byTitleMatch[1]}"`;

        const byCssSelectorMatch = selectorExpression.match(/^locator\(\["([^"]+)"/);
        if (byCssSelectorMatch) return `element "${byCssSelectorMatch[1]}"`;

        const chainedSelectorMatch = selectorExpression.match(/^(.+)\.(nth\((\d+)\)|first\(\)|last\(\))$/s);
        if (chainedSelectorMatch) {
            const baseElementLabel = resolveReadableSelectorLabel(chainedSelectorMatch[1]);
            const chainMethodName  = chainedSelectorMatch[2];
            if (chainMethodName.startsWith('nth')) return `${baseElementLabel} (item ${chainedSelectorMatch[3]})`;
            if (chainMethodName === 'first()') return `${baseElementLabel} (first match)`;
            if (chainMethodName === 'last()')  return `${baseElementLabel} (last match)`;
        }

        return selectorExpression.length > 80 ? `${selectorExpression.slice(0, 77)}...` : selectorExpression;
    } catch {
        return selectorExpression.slice(0, 80);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY SCAN
// ─────────────────────────────────────────────────────────────────────────────

// export async function runAccessibilityScan(page: Page): Promise<void> {
//     // const accessibilityScanResults = await new AxeBuilder({ page })
//     //     .options({
//     //         resultTypes:   ['violations'],
//     //         iframes:       true,
//     //         frameWaitTime: 200,
//     //         absolutePaths: true,
//     //         elementRef:    true,
//     //     })
//     //     .analyze();

//     // const htmlReport = await generateAggregateA11yHtmlReport([
//     //     {
//     //         url:     page.url(),
//     //         results: {
//     //             timestamp:  new Date().toISOString(),
//     //             violations: accessibilityScanResults.violations,
//     //             title:      await page.title(),
//     //         },
//     //     },
//     // ]);

//     // await test.info().attachments.push({
//     //     name:        'Accessibility Report',
//     //     contentType: 'text/html',
//     //     body:        Buffer.from(htmlReport, 'utf-8'),
//     // });
// }

// ─────────────────────────────────────────────────────────────────────────────
// BROWSER LOG CAPTURE
// ─────────────────────────────────────────────────────────────────────────────

export function startBrowserLogCapture(page: Page): string[] {
    const logs: string[] = [];

    page.on('console',       msg => logs.push(`[console][${msg.type()}] ${msg.text()}`));
    page.on('pageerror',     err => logs.push(`[pageerror] ${err.message}`));
    page.on('request',       req => logs.push(`[request] ${req.url()}`));
    page.on('response',      res => logs.push(`[response] ${res.url()}`));
    page.on('requestfailed', req => logs.push(`[requestfailed] ${req.url()}`));

    return logs;
}

// ─────────────────────────────────────────────────────────────────────────────
// BROWSER LOG ATTACHMENT
// ─────────────────────────────────────────────────────────────────────────────

export async function attachBrowserLogs(logs: string[], testInfo: TestInfo): Promise<void> {
    if (!logs || logs.length === 0) return;

    await testInfo.attach('browser-logs.txt', {
        body:        logs.join('\n'),
        contentType: 'text/plain',
    });
}


export async function add_runtime_data(key: string, value: any): Promise<void> {
    try {
        dict[key] = value;
        const list = JSON.stringify(dict, null, 2);
        await log('INFO', `[${test.info().title}] Runtime data added with key: ${key} and value: ${value} | Runtime data : ${list}`);
    } catch (error) {
        await log('ERROR', `[${test.info().title}] Error occurred while adding runtime data | Error: ${error}`);
    }
}

export async function get_runtime_data(key: string): Promise<any> {
    try {
        const value = dict[key];
        await log('INFO', `[${test.info().title}] Runtime data fetched for key: ${key} is: ${value}`);
        return value;
    } catch (error) {
        await log('ERROR', `[${test.info().title}] Error occurred while fetching runtime data | Error: ${error}`);
        return undefined;
    }
}