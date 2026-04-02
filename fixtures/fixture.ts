import { test as base, expect as baseExpect, Locator, Page } from '@playwright/test';
import {captureAndAttachPageScreenshot, resolveReadableSelectorLabel}  from '../utils/utilities';
import { log } from '../utils/logger';


/** Returns the currently-running test case title. */
const testCaseTitle = { toString() { return base.info().title; } };

// ─────────────────────────────────────────────────────────────────────────────
// LOCATOR INTERCEPTOR
// Wraps a Playwright Locator with logging and screenshots
// ─────────────────────────────────────────────────────────────────────────────

function applyLocatorInterceptor(page: Page, locator: Locator, selectorExpression: string): Locator {

    // ── CLICK + RIGHT CLICK ────────────────────────────────────────────────────

    const nativeClick = locator.click.bind(locator);
    locator.click = async (actionOptions?) => {
        const isRightClick = (actionOptions as any)?.button === 'right';
        const actionStartTime = Date.now();
        let actionFailed = false;

        try {
            await log('INFO', `[${testCaseTitle}] ${isRightClick ? 'Right-clicking' : 'Clicking'} on ${resolveReadableSelectorLabel(selectorExpression)}`);
            await nativeClick(actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully ${isRightClick ? 'Right-clicked' : 'Clicked'} on ${resolveReadableSelectorLabel(selectorExpression)}`);
            await captureAndAttachPageScreenshot(page, `${isRightClick ? 'rightClick' : 'click'}_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to ${isRightClick ? 'right-click' : 'click'} on ${resolveReadableSelectorLabel(selectorExpression)} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            const actionLabel = isRightClick ? 'Right Click' : 'Click';
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of ${actionLabel} failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of ${actionLabel} completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── DOUBLE CLICK ──────────────────────────────────────────────────────────

    const nativeDblClick = locator.dblclick.bind(locator);
    locator.dblclick = async (actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Double-clicking on ${elementLabel}`);
            await nativeDblClick(actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Double-clicked on ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `dblclick_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to double-click on ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Double-Click failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Double Click completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── FILL ──────────────────────────────────────────────────────────────────

    const nativeFill = locator.fill.bind(locator);
    locator.fill = async (inputValue: string, actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Filling "${inputValue}" into ${elementLabel}`);
            await nativeFill(inputValue, actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Filled "${inputValue}" into ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `fill_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to fill "${inputValue}" into ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Fill failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Fill completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── PRESS ─────────────────────────────────────────────────────────────────

    const nativePress = locator.press.bind(locator);
    locator.press = async (keyName: string, actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Pressing key "${keyName}" on ${elementLabel}`);
            await nativePress(keyName, actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Pressed key "${keyName}" on ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `press_${keyName}_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to press key "${keyName}" on ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Press Key failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Press Key completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── CHECK ─────────────────────────────────────────────────────────────────

    const nativeCheck = locator.check.bind(locator);
    locator.check = async (actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Checking on element ${elementLabel}`);
            await nativeCheck(actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Checked on element ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `check_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to check on element ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Check failed on "${elementLabel}" in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Check completed on "${elementLabel}" in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── UNCHECK ───────────────────────────────────────────────────────────────

    const nativeUncheck = locator.uncheck.bind(locator);
    locator.uncheck = async (actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Unchecking on element ${elementLabel}`);
            await nativeUncheck(actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Unchecked on element ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `uncheck_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to uncheck on element ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Uncheck failed on "${elementLabel}" in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Uncheck completed on "${elementLabel}" in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── SELECT OPTION ─────────────────────────────────────────────────────────

    const nativeSelectOption = locator.selectOption.bind(locator);
    locator.selectOption = async (selectedValue: any, actionOptions?): Promise<string[]> => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        let optionDisplay: string;
        if (typeof selectedValue === 'string') optionDisplay = `"${selectedValue}"`;
        else if (Array.isArray(selectedValue)) optionDisplay = selectedValue.map((v: string) => `"${v}"`).join(', ');
        else if (selectedValue?.label) optionDisplay = `"${selectedValue.label}"`;
        else if (selectedValue?.value) optionDisplay = `"${selectedValue.value}"`;
        else if (selectedValue?.index !== undefined) optionDisplay = `at index ${selectedValue.index}`;
        else optionDisplay = JSON.stringify(selectedValue);
        try {
            await log('INFO', `[${testCaseTitle}] Selecting option ${optionDisplay} from ${elementLabel}`);
            const selectedOptions = await nativeSelectOption(selectedValue, actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Selected option ${optionDisplay} from ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `selectOption_${selectorExpression}`, base.info());
            return selectedOptions;
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to select option ${optionDisplay} from ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Select Option failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Select Option completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── HOVER ─────────────────────────────────────────────────────────────────

    const nativeHover = locator.hover.bind(locator);
    locator.hover = async (actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Hovering over ${elementLabel}`);
            await nativeHover(actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Hovered over ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `hover_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to hover over ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Hover failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Hover completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── DRAG TO ───────────────────────────────────────────────────────────────

    const nativeDragTo = locator.dragTo.bind(locator);
    locator.dragTo = async (targetLocator: Locator, actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Dragging ${elementLabel} to target element`);
            await nativeDragTo(targetLocator, actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Dragged ${elementLabel} to target element`);
            await captureAndAttachPageScreenshot(page, `dragTo_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to drag ${elementLabel} to target element | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Drag To failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Drag To completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── SET INPUT FILES ───────────────────────────────────────────────────────

    const nativeSetInputFiles = locator.setInputFiles.bind(locator);
    locator.setInputFiles = async (filePaths: any, actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        const filePathDisplay = Array.isArray(filePaths) ? filePaths.join(', ') : String(filePaths);
        try {
            await log('INFO', `[${testCaseTitle}] Attaching file(s) "${filePathDisplay}" to ${elementLabel}`);
            await nativeSetInputFiles(filePaths, actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Attached file(s) "${filePathDisplay}" to ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `setInputFiles_${selectorExpression}`, base.info());
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to attach file(s) "${filePathDisplay}" to ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of Set Input Files failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of Set Input Files completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };

    // ── TEXT CONTENT ──────────────────────────────────────────────────────────

    const nativeTextContent = locator.textContent.bind(locator);
    locator.textContent = async (actionOptions?) => {
        const elementLabel = resolveReadableSelectorLabel(selectorExpression);
        const actionStartTime = Date.now();
        let actionFailed = false;
        try {
            await log('INFO', `[${testCaseTitle}] Reading textContent from ${elementLabel}`);
            await locator.waitFor({ state: 'visible' });
            const result = await nativeTextContent(actionOptions);
            await log('INFO', `[${testCaseTitle}] Successfully Read textContent "${result}" from ${elementLabel}`);
            await captureAndAttachPageScreenshot(page, `textContent_${selectorExpression}`, base.info());
            return result;
        } catch (thrownError) {
            actionFailed = true;
            await log('ERROR', `[${testCaseTitle}] Failed to read textContent from ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                .replace(/\x1B\[[0-9;]*m/g, '')
                .split('\n')[0]
                }`);
            throw thrownError;
        } finally {
            const elapsedDurationMs = Date.now() - actionStartTime;
            if (actionFailed) {
                await log('ERROR', `[${testCaseTitle}] Execution of textContent failed in ${elapsedDurationMs} ms`);
            } else {
                await log('INFO', `[${testCaseTitle}] Execution of textContent completed in ${elapsedDurationMs} ms`);
            }
            await log('INFO', '============================================================================');
        }
    };


    // ── CHAINED LOCATOR FACTORIES — propagate interceptor down the chain ──────

    const nativeFilter = locator.filter.bind(locator);
    locator.filter = (filterOptions?: Parameters<Locator['filter']>[0]): Locator => {
        const filteredLocator = nativeFilter(filterOptions);
        const filterOptionsLabel = filterOptions
            ? Object.entries(filterOptions)
                .map(([key, value]) => `${key}:${value instanceof RegExp ? value.toString() : JSON.stringify(value)}`)
                .join(',')
            : '';
        return applyLocatorInterceptor(page, filteredLocator, `${selectorExpression}.filter({${filterOptionsLabel}})`);
    };

    const nativeNth = locator.nth.bind(locator);
    locator.nth = (itemIndex: number): Locator =>
        applyLocatorInterceptor(page, nativeNth(itemIndex), `${selectorExpression}.nth(${itemIndex})`);

    const nativeFirst = locator.first.bind(locator);
    locator.first = (): Locator =>
        applyLocatorInterceptor(page, nativeFirst(), `${selectorExpression}.first()`);

    const nativeLast = locator.last.bind(locator);
    locator.last = (): Locator =>
        applyLocatorInterceptor(page, nativeLast(), `${selectorExpression}.last()`);

    const nativeChildLocator = locator.locator.bind(locator);
    locator.locator = (childSelectorOrLocator: any, childOptions?: any): Locator => {
        const childLocator = nativeChildLocator(childSelectorOrLocator, childOptions);
        const childSelectorExpression = typeof childSelectorOrLocator === 'string'
            ? childSelectorOrLocator
            : String(childSelectorOrLocator);
        return applyLocatorInterceptor(page, childLocator, `${selectorExpression}.locator(${JSON.stringify(childSelectorExpression)})`);
    };

    return locator;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE FIXTURE
// Overrides the built-in Playwright page fixture to transparently intercept
// all locator-returning methods and page-level actions with structured logging.
// ─────────────────────────────────────────────────────────────────────────────

export const test = base.extend<{ page: Page }>({

    page: async ({ page }, use) => {

        const browserName = base.info().project.name;
        await log('INFO', `[${testCaseTitle}] Using browser type: ${browserName} for test case`);

        // Patch all locator-returning page methods so every selector call is auto-instrumented.
        const interceptedPageMethods: Array<keyof Page> = [
            'locator',
            'getByRole',
            'getByText',
            'getByLabel',
            'getByTestId',
            'getByPlaceholder',
            'getByAltText',
            'getByTitle',
        ];

        for (const methodName of interceptedPageMethods) {
            const nativePageMethod = (page as any)[methodName].bind(page);
            (page as any)[methodName] = (...methodArgs: any[]) => {
                const resolvedLocator = nativePageMethod(...methodArgs);
                const selectorExpression = `${String(methodName)}(${JSON.stringify(methodArgs)})`;
                return applyLocatorInterceptor(page, resolvedLocator, selectorExpression);
            };
        }

        // ── Intercept page.goto ───────────────────────────────────────────────
        const nativeGoto = page.goto.bind(page);
        (page as any).goto = async (appUrl: string, navigationOptions?: Parameters<Page['goto']>[1]) => {
            const actionStartTime = Date.now();
            let actionFailed = false;
            try {
                await log('INFO', `[${testCaseTitle}] Navigating to ${appUrl}`);
                await nativeGoto(appUrl, { waitUntil: (navigationOptions as any)?.waitUntil ?? 'load', ...navigationOptions });
                await log('INFO', `[${testCaseTitle}] Successfully Navigated to ${appUrl}`);
                await captureAndAttachPageScreenshot(page, `goto_${appUrl.replace(/[^a-zA-Z0-9._-]/g, '_')}`, base.info());
            } catch (thrownError) {
                actionFailed = true;
                await log('ERROR', `[${testCaseTitle}] Failed to navigate to ${appUrl} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                    .replace(/\x1B\[[0-9;]*m/g, '')
                    .split('\n')[0]
                    }`);
                throw thrownError;
            } finally {
                const elapsedDurationMs = Date.now() - actionStartTime;
                if (actionFailed) {
                    await log('ERROR', `[${testCaseTitle}] Execution of Navigate to URL failed in ${elapsedDurationMs} ms`);
                } else {
                    await log('INFO', `[${testCaseTitle}] Execution of Navigate to URL completed in ${elapsedDurationMs} ms`);
                }
                await log('INFO', '============================================================================');
            }
        };

        // ── Intercept page.keyboard.press ─────────────────────────────────────
        const nativeKeyboardPress = page.keyboard.press.bind(page.keyboard);
        page.keyboard.press = async (keyName: string, keyOptions?: Parameters<typeof page.keyboard.press>[1]) => {
            const actionStartTime = Date.now();
            let actionFailed = false;
            try {
                await log('INFO', `[${testCaseTitle}] Pressing global key "${keyName}"`);
                await nativeKeyboardPress(keyName, keyOptions);
                await log('INFO', `[${testCaseTitle}] Successfully Pressed global key "${keyName}"`);
                await captureAndAttachPageScreenshot(page, `keyboard_press_${keyName}`, base.info());
            } catch (thrownError) {
                actionFailed = true;
                await log('ERROR', `[${testCaseTitle}] Failed to press global key "${keyName}" | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                    .replace(/\x1B\[[0-9;]*m/g, '')
                    .split('\n')[0]
                    }`);
                throw thrownError;
            } finally {
                const elapsedDurationMs = Date.now() - actionStartTime;
                if (actionFailed) {
                    await log('ERROR', `[${testCaseTitle}] Execution of Global Key Press failed in ${elapsedDurationMs} ms`);
                } else {
                    await log('INFO', `[${testCaseTitle}] Execution of Global Key Press completed in ${elapsedDurationMs} ms`);
                }
                await log('INFO', '============================================================================');
            }
        };

        // ── Intercept page.reload ─────────────────────────────────────────────
        const nativeReload = page.reload.bind(page);
        (page as any).reload = async (reloadOptions?: Parameters<Page['reload']>[0]) => {
            const actionStartTime = Date.now();
            let actionFailed = false;
            try {
                await log('INFO', `[${testCaseTitle}] Reloading page`);
                await nativeReload(reloadOptions);
                await log('INFO', `[${testCaseTitle}] Successfully Reloaded page`);
                await captureAndAttachPageScreenshot(page, `reload`, base.info());
            } catch (thrownError) {
                actionFailed = true;
                await log('ERROR', `[${testCaseTitle}] Failed to reload page | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                    .replace(/\x1B\[[0-9;]*m/g, '')
                    .split('\n')[0]
                    }`);
                throw thrownError;
            } finally {
                const elapsedDurationMs = Date.now() - actionStartTime;
                if (actionFailed) {
                    await log('ERROR', `[${testCaseTitle}] Execution of Reload failed in ${elapsedDurationMs} ms`);
                } else {
                    await log('INFO', `[${testCaseTitle}] Execution of Reload completed in ${elapsedDurationMs} ms`);
                }
                await log('INFO', '============================================================================');
            }
        };

        // ── Intercept page.goBack ─────────────────────────────────────────────
        const nativeGoBack = page.goBack.bind(page);
        (page as any).goBack = async (navOptions?: Parameters<Page['goBack']>[0]) => {
            const actionStartTime = Date.now();
            let actionFailed = false;
            try {
                await log('INFO', `[${testCaseTitle}] Navigating Back`);
                await nativeGoBack(navOptions);
                await log('INFO', `[${testCaseTitle}] Successfully Navigated Back`);
                await captureAndAttachPageScreenshot(page, `goBack`, base.info());
            } catch (thrownError) {
                actionFailed = true;
                await log('ERROR', `[${testCaseTitle}] Failed to navigate back | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                    .replace(/\x1B\[[0-9;]*m/g, '')
                    .split('\n')[0]
                    }`);
                throw thrownError;
            } finally {
                const elapsedDurationMs = Date.now() - actionStartTime;
                if (actionFailed) {
                    await log('ERROR', `[${testCaseTitle}] Execution of Go Back failed in ${elapsedDurationMs} ms`);
                } else {
                    await log('INFO', `[${testCaseTitle}] Execution of Go Back completed in ${elapsedDurationMs} ms`);
                }
                await log('INFO', '============================================================================');
            }
        };

        // ── Intercept page.goForward ──────────────────────────────────────────
        const nativeGoForward = page.goForward.bind(page);
        (page as any).goForward = async (navOptions?: Parameters<Page['goForward']>[0]) => {
            const actionStartTime = Date.now();
            let actionFailed = false;
            try {
                await log('INFO', `[${testCaseTitle}] Navigating Forward`);
                await nativeGoForward(navOptions);
                await log('INFO', `[${testCaseTitle}] Successfully Navigated Forward`);
                await captureAndAttachPageScreenshot(page, `goForward`, base.info());
            } catch (thrownError) {
                actionFailed = true;
                await log('ERROR', `[${testCaseTitle}] Failed to navigate forward | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                    .replace(/\x1B\[[0-9;]*m/g, '')
                    .split('\n')[0]
                    }`);
                throw thrownError;
            } finally {
                const elapsedDurationMs = Date.now() - actionStartTime;
                if (actionFailed) {
                    await log('ERROR', `[${testCaseTitle}] Execution of Go Forward failed in ${elapsedDurationMs} ms`);
                } else {
                    await log('INFO', `[${testCaseTitle}] Execution of Go Forward completed in ${elapsedDurationMs} ms`);
                }
                await log('INFO', '============================================================================');
            }
        };

        await use(page);

    },
});

// ─────────────────────────────────────────────────────────────────────────────
// ASSERTION INTERCEPTOR
// Covers assertions by Playwright
// ─────────────────────────────────────────────────────────────────────────────

export const expect = new Proxy(baseExpect, {
    apply(target, thisArg, [value, ...rest]: [any, ...any[]]) {
        const nativeAssertions = (target as any).apply(thisArg, [value, ...rest]);

        if (!(value && typeof value === 'object' && typeof value.waitFor === 'function' && typeof value.locator === 'function')) {
            return nativeAssertions;
        }

        const rawSelector: string = (value as any)._selector ?? (value as any)._expression ?? (value as any)._locator?._selector ?? 'unknown-locator';
        const elementLabel = resolveReadableSelectorLabel(
            rawSelector
                .replace(/^internal:role=/, '')
                .replace(/\[name="(.+?)"i\]/, ' "$1"')
        );

        return new Proxy(nativeAssertions, {
            get(assertTarget, assertProp, receiver) {
                const originalValue = Reflect.get(assertTarget, assertProp, receiver);

                // ── TO BE VISIBLE ─────────────────────────────────────────────
                if (assertProp === 'toBeVisible' && typeof originalValue === 'function') {
                    return async (assertOptions?: any) => {
                        const actionStartTime = Date.now();
                        try {
                            await originalValue.call(assertTarget, assertOptions);
                        } catch (thrownError) {
                            const elapsedDurationMs = Date.now() - actionStartTime;
                            await log('ERROR', `[${testCaseTitle}] Assertion failed — toBeVisible on ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                                .replace(/\x1B\[[0-9;]*m/g, '')
                                .split('\n')[0]}`);
                            await log('ERROR', `[${testCaseTitle}] Execution of toBeVisible failed in ${elapsedDurationMs} ms`);
                            await log('INFO', '============================================================================');
                            throw thrownError;
                        }
                    };
                }

                // ── TO HAVE VALUE ─────────────────────────────────────────────
                if (assertProp === 'toHaveValue' && typeof originalValue === 'function') {
                    return async (expectedValue: string | RegExp, assertOptions?: any) => {
                        const actionStartTime = Date.now();
                        try {
                            await originalValue.call(assertTarget, expectedValue, assertOptions);
                        } catch (thrownError) {
                            const elapsedDurationMs = Date.now() - actionStartTime;
                            await log('ERROR', `[${testCaseTitle}] Assertion failed — toHaveValue "${String(expectedValue)}" on ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                                .replace(/\x1B\[[0-9;]*m/g, '')
                                .split('\n')[0]}`);
                            await log('ERROR', `[${testCaseTitle}] Execution of toHaveValue failed in ${elapsedDurationMs} ms`);
                            await log('INFO', '============================================================================');
                            throw thrownError;
                        }
                    };
                }

                // ── TO CONTAIN TEXT ───────────────────────────────────────────────────────
                if (assertProp === 'toContainText' && typeof originalValue === 'function') {
                    return async (expectedText: string | RegExp | Array<string | RegExp>, assertOptions?: any) => {
                        const actionStartTime = Date.now();
                        try {
                            await originalValue.call(assertTarget, expectedText, assertOptions);
                        } catch (thrownError) {
                            const elapsedDurationMs = Date.now() - actionStartTime;
                            await log('ERROR', `[${testCaseTitle}] Assertion failed — toContainText "${String(expectedText)}" on ${elementLabel} | ${(thrownError instanceof Error ? thrownError.message : String(thrownError))
                                .replace(/\x1B\[[0-9;]*m/g, '')
                                .split('\n')[0]}`);
                            await log('ERROR', `[${testCaseTitle}] Execution of toContainText failed in ${elapsedDurationMs} ms`);
                            await log('INFO', '============================================================================');
                            throw thrownError;
                        }
                    };
                }

                return originalValue;
            }
        });
    },
    get(target, prop) {
        return (target as any)[prop];
    },
});