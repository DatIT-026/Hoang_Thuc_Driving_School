window.flatStyles = window.flatStyles || ''

window.lightspeedOptimizeStylesheet = function () {
    const currentStylesheet = document.querySelector('.tcb-lightspeed-style:not([data-ls-optimized])')
    if (currentStylesheet) {
        try {
            if (currentStylesheet.sheet && currentStylesheet.sheet.cssRules) {
                if (window.flatStyles) {
                    if (this.optimizing) {
                        setTimeout(window.lightspeedOptimizeStylesheet.bind(this), 24)
                    } else {
                        this.optimizing = true;

                        let rulesIndex = 0;

                        while (rulesIndex < currentStylesheet.sheet.cssRules.length) {
                            const rule = currentStylesheet.sheet.cssRules[rulesIndex]
                            /* remove rules that already exist in the page */
                            if (rule.type === CSSRule.STYLE_RULE && window.flatStyles.includes(`${rule.selectorText}{`)) {
                                currentStylesheet.sheet.deleteRule(rulesIndex)
                            } else {
                                rulesIndex++
                            }
                        }
                        /* optimize, mark it such, move to the next file, append the styles we have until now */
                        currentStylesheet.setAttribute('data-ls-optimized', '1')

                        window.flatStyles += currentStylesheet.innerHTML

                        this.optimizing = false
                    }
                } else {
                    window.flatStyles = currentStylesheet.innerHTML
                    currentStylesheet.setAttribute('data-ls-optimized', '1')
                }
            }
        } catch (error) {
            console.warn(error)
        }

        if (currentStylesheet.parentElement.tagName !== 'HEAD') {
            const stylesheetID = currentStylesheet.id;
            if ((!stylesheetID || (stylesheetID && !document.querySelector(`head #${stylesheetID}`)))) {
                document.head.prepend(currentStylesheet)
            } else {
                currentStylesheet.remove();
            }
        }
    }
}

window.lightspeedOptimizeFlat = function (styleSheetElement) {
    if (document.querySelectorAll('link[href*="thrive_flat.css"]').length > 1) {
        /* disable this flat if we already have one */
        styleSheetElement.setAttribute('disabled', true)
    } else {
        /* if this is the first one, make sure he's in head */
        if (styleSheetElement.parentElement.tagName !== 'HEAD') {
            document.head.append(styleSheetElement)
        }
    }
}