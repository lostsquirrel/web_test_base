
var api = "/api/cognitive";
var sks = ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"];
$(document).ready(function () {

    $('#url').on('change', function () {
        $('#msg').hide();
        var formData = new FormData($('form')[0]);
        var ti = $('#url').val();
        if (!ti) {
            $('#msg').html('请填写图片地址或上传一张照片').show();
        } else {
            var url = api + "/pic";

            disPlayImage(ti, function (pic_real_width, pic_real_height) {
                submitForm(formData, url, function (data) {
                    showResult(data, pic_real_width, pic_real_height)
                });
            })
        }

    });
    $('#file').on('change', function () {
        $('#msg').hide();
        var formData = new FormData($('form')[0]);
        var url = api + "/upload/";
        submitForm(formData, url, function (data) {
            var url = data.url;
            $('#url').val(url);
            $('#imgSource').attr('src', data.url);

        });
    });


});

function submitForm(formData, url, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: callback,
        error: function (data) {
            console.log("error");
            console.log(data);
        }
    });
}

function disPlayImage(imageUrl, callback) {
    $('#imgSource').attr('src', imageUrl);
    var img = document.getElementById("imgSource");

    $("<img src=\"" + imageUrl + "\"/>") // Make in memory copy of image to avoid css issues
        .on('load', function () {
            var pic_real_width = this.width;   // Note: $(this).width() will not
            var pic_real_height = this.height; // work for in memory images.
            // console.log($(this))
            // 如果图片宽度大于 680 等比缩放至 680
            if (pic_real_width > 680) {
                pic_real_width = 680;
                pic_real_height = pic_real_height / (pic_real_width / 680)
            }
            callback(pic_real_width, pic_real_height)
        });

}

function showResult(data, pic_real_width, pic_real_height) {

    var c = document.getElementById("imgDisplay");
    var ctx = c.getContext("2d");


    var $imgDisplay = $('#imgDisplay');
    $imgDisplay.attr("width", pic_real_width);
    $imgDisplay.attr("height", pic_real_height);
    var img = document.getElementById("imgSource");
    console.debug(img);
    console.debug(pic_real_width);
    console.debug(pic_real_height);
    ctx.drawImage(img, 10, 10);

    var mqs = '';
    var scores = '';
    $(data).each(function (k, item) {
        mqs += '<p>' + item.result + '</p>';
        scores += '<div class="row">';
        $(sks).each(function (k, v) {
            scores += '<div class="progress">';
            var score = item['scores'][v] * 100;
            scores += '<div class="progress-bar" role="progressbar" aria-valuenow="' + score + '" aria-valuemin="0" aria-valuemax="100" style="width:' + score + '%">';
            scores += v + '&nbsp;&nbsp' + score + '%';
            scores += '</div>';
            scores += '</div>';

            scores += '<div class="w-100"></div>';
        });
        scores += '</div>';
        var faceRectangle = item['faceRectangle'];
        // console.log(item)
        ctx.beginPath();
        ctx.rect(faceRectangle.left, faceRectangle.top, faceRectangle.width, faceRectangle.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    });
    if (!data || data.length === 0) {
        mqs = "图片未能识别"
    }
    $('div.mqs').html(mqs);
    $('#scores_grid').html(scores)
    //   context.fillStyle = 'red';
    //   context.fill();

}

