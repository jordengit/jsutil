(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

})(function ($) {

    'namespace plusone';
    $.plusone = $.plusone || {};
    $.extend($.plusone, {
        version: '1.0.0',
        getAccessor: (obj, expr) => {
            var ret, p, prm = [], i;
            if (typeof expr === 'function') { return expr(obj); }
            ret = obj[expr];
            if (ret === undefined) {
                try {
                    if (typeof expr === 'string') {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if (i) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) { }
            }
            return ret;
        },
        getMethod: (name) => {
            return this.getAccessor($.fn.Plusone, name);
        },
        extend: (methods) => {
            $.extend($.fn.Plusone, methods);
            if (!this.no_legacy_api) {
                $.fn.extend(methods);
            }
        },
        Guid: () => {
            var result, i, j;
            result = '';
            for (j = 0; j < 32; j++) {
                if (j == 8 || j == 12 || j == 16 || j == 20)
                    result = result + '-';
                i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            return result;
        }
    });

    $.fn.Plusone = function (pin) {
    };

    $.plusone.extend({
    });

    $.plusone.busybox = $.plusone.busybox || {};

    $.extend($.plusone.busybox, {
        version: '1.0.0',
        show: () => { $('#myModal').show(); },
        hide: () => { setTimeout(() => { $('#myModal').hide(); }, 500); }
    });
});

if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if (!Number.pad) {
    Number.prototype.pad = function (size) {
        var s = String(this);
        while (s.length < (size || 2)) { s = "0" + s; }
        return s;
    }
}

$(document).bind('ajaxSend', function (event, xhr) {
    if (xhr.status == 401) {
        alert('Session timeout!');
        setTimeout(function () {
            location.reload();
        }, 2000);
    }
}).bind('ajaxError', function (event, xhr) {
    if (xhr.status == 401) {
        alert('Session timeout!');
        setTimeout(function () {
            location.reload();
        }, 2000);
    }
});

(function () {
    window.onerror = function(errorMsg, url, lineNumber) {
        var DTO = {
            errorMsg: errorMsg,
            url: url,
            lineNumber: lineNumber
        };

        setTimeout(function(){
            $.ajax({
                url: serviceUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(DTO),
                complete: function () {
                    alert('Message: ' + errorMsg + '\nUrl: ' + url + '\nLine: ' + lineNumber);
                }
            });
        }, 50);
    }
})(window.onerror);

(function () {
    window.alert = function () {
        try {
            var totalErrorMessage = arguments[0];
            var messageType = arguments[1];
            var delayTime = arguments[2];            
            var errors = totalErrorMessage.split(/(?:\r\n|\r|\n)/g);
            if (errors[errors.length - 1] == '') errors.splice(-1, 1);
        } catch(e) {
            if (console !== null) console.error(e);
        }
    };
})(window.alert);
