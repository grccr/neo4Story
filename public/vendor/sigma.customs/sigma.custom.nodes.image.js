sigma.utils.pkg('sigma.canvas.nodes');
sigma.canvas.nodes.image = (function() {

    var imageOn = true;

    var _cache = {},
        _loading = {},
        _callbacks = {};
    // Return the renderer itself:
    var renderer = function(node, context, settings) {
        if(node.image && imageOn) {
            var args = arguments,
                prefix = settings('prefix') || '',
                size = node[prefix + 'size'],
                color = node.color || settings('defaultNodeColor'),
                url = node.image;
            if (_cache[url]) {
                context.fillStyle = color;
                context.save();

                // Draw background circle!

                context.beginPath();
                context.arc(
                    node[prefix + 'x'],
                    node[prefix + 'y'],
                    node[prefix + 'size'],
                    0,
                    Math.PI * 2,
                    true
                );

                context.closePath();
                context.fill();
                //

                // Clip disc for image!
                context.beginPath();
                context.arc(
                    node[prefix + 'x'],
                    node[prefix + 'y'],
                    node[prefix + 'size'],
                    0,
                    Math.PI * 2,
                    true
                );
                context.closePath();
                context.clip();

                // Draw the image!
                context.drawImage(
                    _cache[url],
                    node[prefix + 'x'] - size,
                    node[prefix + 'y'] - size,
                    2 * size,
                    2 * size
                );

                // Quit the "clipping mode":
                context.restore();
                // Draw the border:
                context.beginPath();
                context.arc(
                    node[prefix + 'x'],
                    node[prefix + 'y'],
                    node[prefix + 'size'],
                    0,
                    Math.PI * 2,
                    true
                );
                // border
                context.lineWidth = size * node.borderWidth * 0.05;
                context.strokeStyle = node.borderColor || '#fff';
                context.stroke();


                if(node.selected) {
                    var labelFontSize,
                        prefix = settings('prefix') || '',
                        size = node[prefix + 'size'];

                    // BORDER STUFF
                    // context.fillStyle = node.color || settings('defaultNodeColor');
                    context.beginPath();
                    context.arc(
                        node[prefix + 'x'],
                        node[prefix + 'y'],
                        1.4*node[prefix + 'size'],
                        0,
                        Math.PI * 2,
                        true
                    );

                    context.closePath();
                    // context.fill();

                    // Adding a border
                    context.lineWidth = size*0.4;
                    context.strokeStyle = node.hoverBorderColor || '#fff';
                    context.stroke();
                }

            } else {
                sigma.canvas.nodes.image.cache(url);
                sigma.canvas.nodes.image.apply(
                    sigma.canvas.nodes,
                    args
                );
            }
        }
        else {
            var prefix = settings('prefix') || '';

            context.fillStyle = node.color || settings('defaultNodeColor');
            context.beginPath();
            context.arc(
                node[prefix + 'x'],
                node[prefix + 'y'],
                node[prefix + 'size'],
                0,
                Math.PI * 2,
                true
            );

            context.closePath();
            context.fill();

            // Adding a border
            context.lineWidth = node.borderWidth || 1;
            context.strokeStyle = node.borderColor || '#fff';
            context.stroke();
        }
    };
    // Let's add a public method to cache images, to make it possible to
    // preload images before the initial rendering:
    renderer.cacheArray = function(urls, callback) {
        for (var i in urls) {
            var url = urls[i];
            renderer.cache(url);
            if(i == urls.length - 1) {      // last element - cache and do callback
                renderer.cache(url, callback);   // warning!!! if last element is loading - there will be callback's death
                                                 // if this collapsing situation will appear - will be refactored
            }
        }
    };

    renderer.cache = function(url, callback) {
        if (callback)
            _callbacks[url] = callback;
        if (_loading[url])
            return;
        var img = new Image();
        img.onload = function() {
            _loading[url] = false;
            _cache[url] = img;
            if (_callbacks[url]) {
                _callbacks[url].call(this, img);
                delete _callbacks[url];
            }
        };
        _loading[url] = true;
        img.src = url;
    };
    return renderer;
})();
