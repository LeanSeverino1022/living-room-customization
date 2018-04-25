
$(document).ready(function () {

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    let xhr = null;
    const productImage = $('img#product');

    // abortableWhen function
    // This function will create a $.when function whose requests are abortable
    // in the event of request spamming
    function abortableWhen($, xhrs) {
        return {
            abort: () => {
                xhrs.map(request => request.abort());
            },

            // Return $.when as a promise.
            // $.when waits for all the requests to finish before continuing
            promise: $.when(
                ...xhrs
            )
        };
    }


    // COLOR PICKER EVENT HANDLERS

    // back_wall
    $('#back_wall .options-container').on('click', '.item-color-option', function() {
            if( $(this).hasClass('active') ) {
                return;
            }
            
            // $('.nav-list li.active').removeClass('active');
            $(".item-color-option[data-target='o1']").removeClass('active');

            $(this).addClass('active');

            return optionsRequest(jQuery);
    });

    // front_wall
    $('#front_wall .options-container').on('click', '.item-color-option', function() {
        
            if( $(this).hasClass('active') ) {
                return;
            }
            
            // $('.nav-list li.active').removeClass('active');
            $(".item-color-option[data-target='o3']").removeClass('active');

            $(this).addClass('active');

            return optionsRequest(jQuery);
    });

    // flooring
    $('#flooring .options-container').on('click', '.item-color-option', function() {
        
            if( $(this).hasClass('active') ) {
                return;
            }
            
            // $('.nav-list li.active').removeClass('active');
            $(".item-color-option[data-target='o2']").removeClass('active');

            $(this).addClass('active');

            return optionsRequest(jQuery);
    });
    
    let optionsRequest = function ($) {


        const o1 = $(".item-color-option.active[data-target='o1']").data().color;  //floor          
        const o2 = $(".item-color-option.active[data-target='o2']").data().color;  //front_wall    
        const o3 = $(".item-color-option.active[data-target='o3']").data().color;  //back_wall    
 

        // if a request already exists, then abort it to avoid spamming
        // and response overlap.
        if (xhr)
            xhr.abort();

        //  Create the request
        //  THESE ARE THE REQUEST, YOU'LL HAVE TO MAKE THE CHANGES HERE
        xhr = abortableWhen(jQuery, [
            // jQuery.get(`https://everthreadapi.com/calibration/preview2.php?r5d=54&augmentID=2200&format=NOTbase64&patternID=1&isThumb=0&color1=191919&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&${constructQueryString([o1, o2, o3, o4])}`),
            jQuery.get(`https://everthreadapi.com/calibration/preview2.php?r5d=54&augmentID=2221&format=NOTbase64&patternID=1&isThumb=0&color1=&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&${constructQueryString([o1, o2, o3])}`),
        ]);


        return xhr.promise.done(image => {
            productImage.attr('src', $(image).attr('src'));

            xhr = null;

            return true;
        })
        .catch(error => {
            console.log('error', error);

            return true;
        });
    }; 

    let constructQueryString = function (optionsArray) {
        return optionsArray.filter(option => option)
            .map((val, idx) => `o${idx + 1}=${idx + 1}-${val}`)
            .join('&');
    };


});



