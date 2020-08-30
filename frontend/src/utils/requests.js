// Add methods for api calls using axios here
import $ from 'jquery';

const csrfSafeMethod = (method) => {
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
};

const sameOrigin = (url) => {
    let host = document.location.host; // host + port
    let protocol = document.location.protocol;
    let sr_origin = '//' + host;
    let origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin

    return (
        url == origin ||
        url.slice(0, origin.length + 1) == origin + '/' ||
        url == sr_origin ||
        url.slice(0, sr_origin.length + 1) == sr_origin + '/' ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !/^(\/\/|http:|https:).*/.test(url)
    );
};

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader('X-CSRFToken', document.getElementById('csrfmiddlewaretoken').value);
        }
    }
});

export function doGet(path, successCallback, failureCallback) {
    const url = path;

    return $.ajax({
        url,
        type: 'GET',
        success: (response) => {
            if (successCallback) {
                successCallback(response || '');
            }

            return response || {};
        },
        error: (request, status, error) => {
            if (failureCallback) {
                // failureCallback(error);
                failureCallback(request?.responseText || error);
            }
        }
    });
}

export const doPost = (path, data, successCallback, failureCallback, contentType) => {
    const url = path;

    return $.ajax({
        url,
        type: 'POST',
        data,
        ...(contentType ? {contentType} : {}),
        success: (response) => {
            if (successCallback) {
                successCallback(response || '');
            }

            return response || {};
        },
        error: (request, status, error) => {
            if (failureCallback) {
                failureCallback(error, request);
            }
        }
    });
};

export function doDelete(path, successCallback, failureCallback) {
    const url = path;

    return $.ajax({
        url,
        type: 'DELETE',
        success: (response) => {
            if (successCallback) {
                successCallback(response || '');
            }

            return response || {};
        },
        error: (request, status, error) => {
            if (failureCallback) {
                failureCallback(error);
            }
        }
    });
}