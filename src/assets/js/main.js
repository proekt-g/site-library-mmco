$(window).on("load", () => {
    function ajaxRequest(ajaxForm, url) {
        try {
            history.replaceState(null, null, "#");
        } catch (z) {
            console.log(z);
        }
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: $("." + ajaxForm).serialize(), // Сеарилизуем объект
            success: function (response) {
                //Данные отправлены успешно
                let result = $.parseJSON(response);
                console.log(result);
            },
            error: function (response) {
                // Данные не отправлены
                alert("Ошибка. Данные не отправлены.");
            },
        });
    }

    $(".filter__form").on("input", function () {
        event.preventDefault();
        ajaxRequest("filter__form", "test.php");
    });
    $(".filter__form").on("submit", function () {
        event.preventDefault();
        ajaxRequest("filter__form", "test.php");
    });
    $(".menu__burger").on("click", function () {
        $(this).toggleClass("menu__burger--open");
        $(".menu").toggleClass("menu__burger--open");
    });
    $(".filter__top-tag").on("click", function () {
        if ($(this).hasClass("filter__top-tag--all")) {
            $(this).addClass("filter__top-tag--check");
            $(".filter__top-tag").not(this).removeClass("filter__top-tag--check");
        } else {
            $(this).toggleClass("filter__top-tag--check");
            $(".filter__top-tag--all").removeClass("filter__top-tag--check");
        }
    });
    $(".filter__form").on("input", () => {
        if ($(event.target).hasClass("filter__input--all")) {
            $(event.target).parent().children(".filter__input").not(event.target).prop("checked", false);
            $(event.target).prop("checked", true);
        } else $(".filter__input--all").prop("checked", false);
    });
    $(".filter__top-switch-text").on("click", function () {
        $(this).parent().toggleClass("filter__top-switch--open");
        $(".filter__modal").slideToggle(400);
    });
    $(".filter__modal-label").on("click", function () {
        $(".filter__top-switch-text").text($(this).text());
        $(".filter__modal-label--hidden").toggleClass("filter__modal-label--hidden");
        $(this).toggleClass("filter__modal-label--hidden");
        $(".filter__modal").toggle(0);
        $(".filter__top-switch").toggleClass("filter__top-switch--open");
    });
    $(".filter__bottom-label--left").on("click", () => {
        $(".filter__bottom-toggle").removeClass("filter__bottom-toggle--right");
        $(".filter__bottom-toggle").addClass("filter__bottom-toggle--left");
    });
    $(".filter__bottom-label--right").on("click", () => {
        $(".filter__bottom-toggle").removeClass("filter__bottom-toggle--left");
        $(".filter__bottom-toggle").addClass("filter__bottom-toggle--right");
    });
    $(".filter__bottom-toggle").on("click", function () {
        if ($(".filter__input--left").is(":checked")) $(".filter__input--right").trigger("click");
        else $(".filter__input--left").trigger("click");
        $(".filter__bottom-toggle").toggleClass("filter__bottom-toggle--left");
        $(".filter__bottom-toggle").toggleClass("filter__bottom-toggle--right");
    });
});
