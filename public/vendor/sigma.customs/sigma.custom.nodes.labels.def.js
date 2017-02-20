;(function(undefined) {
    'use strict';
    if (typeof sigma === 'undefined')
        throw 'sigma is not declared';
    // Initialize packages:
    sigma.utils.pkg('sigma.canvas.labels');
    /**
     * This label renderer will just display the label on the right of the node.
     *
     * @param  {object}                   node     The node object.
     * @param  {CanvasRenderingContext2D} context  The canvas context.
     * @param  {configurable}             settings The settings function.
     */
    sigma.canvas.labels.def = function(node, context, settings) {
        // debugger;
        var labelFontSize,
            prefix = settings('prefix') || '',
            size = node[prefix + 'size'];
        if (size < settings('labelThreshold'))
            return;
        if (!node.label || typeof node.label !== 'string')
            return;
        labelFontSize = (settings('labelSize') === 'fixed') ?
            settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;
        context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
            labelFontSize + 'px ' + settings('font');
        // do BG
        context.beginPath();
        // context.fillStyle = settings('labelHoverBGColor') === 'node' ?
        //     (node.color || settings('defaultNodeColor')) :
        //     settings('defaultHoverLabelBGColor');
        context.fillStyle = '#fff';
        var x = Math.round(node[prefix + 'x']);
        var w_diff = 1.7*labelFontSize;
        var y = Math.round(node[prefix + 'y']) + 1.1 * size;
        var w = Math.round(
            context.measureText(node.label).width
        ) + w_diff;
        var e = Math.round(0.7*labelFontSize);

        // var node_x = Math.round(node[prefix + 'x']) - w/2 + w_diff/2 + ;

        var diff_x = w/2 + 10;

        context.moveTo(x - diff_x + w_diff/2, y + e);
        context.arcTo(x - diff_x + w_diff/2, y + 2*e, x - diff_x + w_diff/2 + e, y + 2*e, e/2);
        context.lineTo(x + diff_x - 2*e, y + 2*e);
        context.arcTo(x + diff_x - e, y + 2*e, x + diff_x - e, y + e, e/2);
        context.arcTo(x + diff_x - e, y, x + diff_x - 2*e, y, e/2);
        context.lineTo(x - diff_x + w_diff/2 + e, y);
        context.arcTo(x - diff_x + w_diff/2, y, x - diff_x + w_diff/2, y + 2*e, e/2);
        context.closePath();
        context.fill();

        context.fillStyle = (settings('labelColor') === 'node') ?
            (node.color || settings('defaultNodeColor')) :
            settings('defaultLabelColor');

        context.fillText(
            node.label,
            Math.round(node[prefix + 'x'] - w/2 + w_diff/2 + 4),
            Math.round(y + labelFontSize)
        );
    };



}).call(this);