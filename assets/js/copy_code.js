document.addEventListener('DOMContentLoaded', function() {

    // Attach the event to all copy-indicators
    const copyIndicators = document.querySelectorAll('.copy-indicator');

    copyIndicators.forEach(copyIndicator => {
        copyIndicator.addEventListener('click', function() {

            // Find the closest .bibtex-content
            const bibtexContentElem = copyIndicator.closest('.bibtex-content');

            // Extract the content from bibtexContentElem
            const text = bibtexContentElem.textContent.replace(copyIndicator.textContent, "").trim();
            copyToClipboard(text);

            // Show tooltip
            const calloutTip = copyIndicator.closest('.callout-tip');
            const tooltip = calloutTip.querySelector('.copy-tooltip');
            if (tooltip) {
                showTooltip(tooltip);
            }
        });
    });

    function copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    function showTooltip(tooltipElement) {
        tooltipElement.style.display = 'inline-block'; // Ensure the tooltip is visible
        tooltipElement.style.visibility = 'visible';
        tooltipElement.style.opacity = '1';

        setTimeout(() => {
            tooltipElement.style.visibility = 'hidden';
            tooltipElement.style.opacity = '0';
        }, 1500);
    }
});
