function resizeWindow() {
    if ($(window).width() <= 950)
        $(".information__btn").addClass("button-help--hidden")
    else $(".information__btn").removeClass("button-help--hidden")
}

$(window).on("load", () => {
    let textHeight

    function ajaxRequest(ajaxForm, url) {
        try {
            history.replaceState(null, null, "#")
        } catch (z) {
            console.log(z)
        }
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: $("." + ajaxForm).serialize(), // Сеарилизуем объект
            success: function (response) {
                //Данные отправлены успешно
                let result = $.parseJSON(response)
                console.log(result)
            },
            error: function (response) {
                // Данные не отправлены
                alert("Ошибка. Данные не отправлены.")
            },
        })
    }
    function clickAvatar() {
        $(".box__all-avatar--active")
            .not($(this).parent().children(".box__all-avatar"))
            .toggleClass("box__all-avatar--active")
        $(this)
            .parent()
            .children(".box__all-avatar")
            .toggleClass("box__all-avatar--active")
    }
    function clickDropList(_this, modifier, list) {
        $(_this).parent().toggleClass(modifier)
        $(list).slideToggle(400)
    }
    function clickElementDropList(_this, input) {
        $(input).text($(_this).text())
    }
    function checkTagsBlock() {
        if ($(".filters__block-check--active").length === 0)
            $(".filters__tags").removeClass("filters__tags--active")
        else $(".filters__tags").addClass("filters__tags--active")
    }
    function deleteTag() {
        $(this).parent(".filters__tag").remove()
        let _this = this
        $(".filters__block-label").each(function () {
            if (
                $(this).text().replace(/\s+/g, "") ===
                $(_this)
                    .parent(".filters__tag")
                    .children(".filters__tag-text")
                    .text()
                    .replace(/\s+/g, "")
            ) {
                $(this)
                    .parent(".filters__block-item")
                    .children(".filter-input")
                    .prop("checked", false)
                $(this)
                    .parent(".filters__block-item")
                    .children(".filters__block-check")
                    .toggleClass("filters__block-check--active")
            }
        })
        // Отправка формы при удалении тега страница "Библиотеки"
        ajaxRequest("filters__form", "test.php")
        // /Отправка формы при удалении тега страница "Библиотеки"
        checkTagsBlock()
    }
    function clickFilterBlockElement() {
        let _this = this
        if (
            !$(this)
                .parent()
                .children(".filters__block-check")
                .hasClass("filters__block-check--active")
        ) {
            $(
                `
            <div class="filters__tag">
                <div class="filters__tag-text">${$(this)
                    .parent()
                    .children(".filters__block-label")
                    .text()}
                </div>
                <div class="filters__tag-close">
                  <svg width="19" height="12" viewBox="0 0 19 12" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path d="M5.721.667l5.396 5.397-5.396 5.397M16.405.667l-5.397 5.397 5.397 5.397" stroke="#fff" stroke-width="1.5" />
                  </svg>
                </div>
            </div>
            `
            ).appendTo(".filters__tags")
            $(".filters__tag")
                .last()
                .children(".filters__tag-close")
                .on("click", deleteTag)
        } else {
            $(".filters__tag-text").each(function () {
                if (
                    $(this).text().replace(/\s+/g, "") ===
                    $(_this)
                        .parent()
                        .children(".filters__block-label")
                        .text()
                        .replace(/\s+/g, "")
                )
                    $(this).parent().remove()
            })
        }
        $(this)
            .parent()
            .children(".filters__block-check")
            .toggleClass("filters__block-check--active")
        checkTagsBlock()
    }
    function clickMoreFilters() {
        if ($(window).width() <= 500) $("body").toggleClass("body-block")
        $(".filters__more").toggleClass("filters__more--open")
        $(".filters__block").toggleClass("filters__block--active")
    }

    // Формы
    // **************************
    // Страница Календарь событий

    $(".filter__form").on("input", function () {
        event.preventDefault()
        ajaxRequest("filter__form", "test.php")
    })

    $(".filter__form").on("submit", function () {
        event.preventDefault()
        ajaxRequest("filter__form", "test.php")
    })

    $(".filter__form").on("input", () => {
        if ($(event.target).hasClass("filter__input--all")) {
            $(event.target)
                .parent()
                .children(".filter__input")
                .not(event.target)
                .prop("checked", false)
            $(event.target).prop("checked", true)
        } else $(".filter__input--all").prop("checked", false)
    })

    // /Страница Календарь событий

    // Страница Спикеры

    $(".navigation__form").on("input", (event) => {
        event.preventDefault()
        ajaxRequest("navigation__form", "test.php")
    })
    $(".navigation__form").on("submit", (event) => {
        event.preventDefault()
        ajaxRequest("navigation__form", "test.php")
    })

    // /Страница Спикеры

    // Каталог Библиотеки

    $(".filters__form").on("submit", (event) => {
        event.preventDefault()
        ajaxRequest("filters__form", "test.php")
    })

    $(".filters__form").on("input", (event) => {
        if (!$(event.target).parent(".filters__block-item").length) {
            event.preventDefault()
            ajaxRequest("filters__form", "test.php")
        }
    })

    // /Каталог Библиотеки
    // **************************
    // /Формы

    $(".information__btn--share").on("click", () => {
        $(".information__share").toggleClass("information__share--active")
    })

    $(".menu__burger").on("click", function () {
        $("body").toggleClass("body-block")
        $(this).toggleClass("menu__burger--open")
        $(".menu").toggleClass("menu--open")
    })
    $(".filter__top-tag").on("click", function () {
        if ($(this).hasClass("filter__top-tag--all")) {
            $(this).addClass("filter__top-tag--check")
            $(".filter__top-tag")
                .not(this)
                .removeClass("filter__top-tag--check")
        } else {
            $(this).toggleClass("filter__top-tag--check")
            $(".filter__top-tag--all").removeClass("filter__top-tag--check")
        }
    })

    $(".box__button--share").on("focus", (event) => {
        $(event.target)
            .parent()
            .children(".box__share")
            .toggleClass("box__share--active")
    })
    $(".box__button--share").on("blur", (event) => {
        $(event.target)
            .parent()
            .children(".box__share")
            .toggleClass("box__share--active")
    })

    $(".filter__top-switch-text").on("click", function () {
        clickDropList(this, "filter__top-switch--open", ".filter__modal")
    })
    $(".filter__modal-label").on("click", function () {
        clickElementDropList(this, ".filter__top-switch-text")
        $(".filter__modal-label--hidden").toggleClass(
            "filter__modal-label--hidden"
        )
        $(this).toggleClass("filter__modal-label--hidden")
        clickDropList(
            $(this).parent(),
            "filter__top-switch--open",
            ".filter__modal"
        )
    })

    $(".toggle__label--left").on("click", () => {
        $(".toggle__switch").removeClass("toggle__switch--right")
        $(".toggle__switch").addClass("toggle__switch--left")
    })
    $(".toggle__label--right").on("click", () => {
        $(".toggle__switch").removeClass("toggle__switch--left")
        $(".toggle__switch").addClass("toggle__switch--right")
    })
    $(".toggle__switch").on("click", function () {
        if ($(".toggle__input--left").is(":checked"))
            $(".toggle__input--right").trigger("click")
        else $(".toggle__input--left").trigger("click")
        $(".toggle__switch").toggleClass("toggle__switch--left")
        $(".toggle__switch").toggleClass("toggle__switch--right")
    })

    $(".filter-switch__text").on("click", (event) => {
        clickDropList(
            event.target,
            "filter-switch--active",
            ".filter-switch__modal"
        )
    })
    $(".filter-switch__modal-label").on("click", (event) => {
        $(".filter-switch__text").text($(event.target).text())
        $(".filter-switch__modal").toggle(0)
        $(".filter-switch").toggleClass("filter-switch--active")
        if ($(window).width() >= 1200)
            $(".filter-search").height($(".filter-switch").outerHeight())
    })
    $(".navigation__switch-text").on("click", () => {
        if ($(window).width() <= 500) $("body").toggleClass("body-block")
    })
    $(".navigation__switch-label").on("click", () => {
        if ($(window).width() <= 500) $("body").toggleClass("body-block")
    })

    $(".navigation__close").on("click", (event) => {
        $("body").toggleClass("body-block")
        $(".navigation__switch").toggleClass("navigation__switch--open")
        $(".navigation__modal").slideToggle(400)
    })
    $(".filters__block-close").on("click", (event) => {
        clickMoreFilters()
    })
    $(".filters__block-btn").on("click", () => {
        clickMoreFilters()
    })
    $(".filters__more").on("click", (event) => {
        clickMoreFilters()
    })

    $(".filters__block-check").on("click", clickFilterBlockElement)
    $(".filters__block-label").on("click", clickFilterBlockElement)
    $(".filters__tags-close").on("click", () => {
        $(".filters__tag").remove()
        $(".filters__block-check--active").removeClass(
            "filters__block-check--active"
        )
        $(".filters__block-item .filter-input").prop("checked", false)
        checkTagsBlock()
    })

    $(".bio__more").on("click", (event) => {
        let buffText = $(event.target).text()
        $(event.target).text($(event.target).data("close-text"))
        $(event.target).data("close-text", buffText)

        if (
            $(".bio__text").height() === $(".bio__text-p").get(0).scrollHeight
        ) {
            $(".bio__text-p").animate({ height: textHeight }, 1000, () => {
                $(".bio__text").toggleClass("bio__text--open")
            })
        } else {
            $(".bio__text").toggleClass("bio__text--open")
            textHeight = $(".bio__text").height()
            $(".bio__text-p").animate(
                { height: $(".bio__text-p").get(0).scrollHeight },
                1000
            )
        }
    })

    $(".box__avatars-inner").on("click", clickAvatar)

    $(window).on("resize", resizeWindow)
    checkTagsBlock()
    $(function () {
        if ($(window).width() >= 950) {
            $(".content__tape").overlayScrollbars({})
            $(".box__all-avatar-scroll").overlayScrollbars({})
            $(".navigation__modal").overlayScrollbars({})
        }
    })
    $('a[href^="#"]').on("click", function (event) {
        // event.preventDefault()
        if (String(this).slice(-1) !== "#") {
            let sc = $(this).attr("href"),
                dn = $(sc).offset().top
            $("html, body").animate({ scrollTop: dn - 100 }, 1000)
        }
    })
})
$(resizeWindow)
$(document).on("readystatechange", function () {
    if (document.readyState === "interactive" && $(window).width() <= 1200) {
        $(".content__picture").each(function (index) {
            $(".swiper-wrapper").append(
                `<div class="swiper-slide" id="swiper-slide-${index}"></div>`
            )
            $(this).appendTo(`#swiper-slide-${index}`)
        })
        $(".content__text").each(function (index) {
            $(this).appendTo(`#swiper-slide-${index}`)
        })
        let mySwiper = new Swiper(".swiper-container", {
            slidesPerView: "auto",
            spaceBetween: 16,
        })
    }
})
