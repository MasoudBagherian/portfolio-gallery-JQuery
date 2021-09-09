$(document).ready(function () {
	//add a border bottom to nav links
	$('.menu__link').append('<span class="menu__link-border"></span>')

	//open main menu in small device by the hamberger menu
	$('.menu-toggle').click(function () {
		$('.menu').addClass('menu-open')
		$('body').addClass('body-shift')
		$('.backdrop').addClass('backdrop-show')
	})
	//close main menu by clicking on the backdrop
	$('.backdrop').click(function () {
		$('.menu').removeClass('menu-open')
		$('body').removeClass('body-shift')
		$('.backdrop').removeClass('backdrop-show')
		$('.slider').removeClass('slider-open')
	})

	$('.menu__link').click(function () {
		//set category to title of projects section by clicking on each nav link
		var category = $(this).text()
		$('.projects-title').text(category)
		//show just images with special category witch is set by clicking the nav links
		var imageCat = category.toLowerCase().replace(' ', '-')
		if (imageCat == 'all-projects') {
			$('.project').removeClass('hidden').addClass('show')
		} else {
			$('.project').each(function () {
				if ($(this).hasClass(imageCat)) {
					$(this).addClass('show').removeClass('hidden')
				} else {
					$(this).removeClass('show').addClass('hidden')
				}
			})
		}
		$('.project.hidden').hide()
		$('.project.show').fadeOut(200).fadeIn(200)


	})
	//slide toggle image overlay
	$('.project__img').hover(function () {
		$(this).find('.project__overlay').slideDown()
	}, function () {
		$(this).find('.project__overlay').slideUp()
	})


	$('.project').each(function () {
		//set a title and a description for image overlays according to data-title and data-desc set for div.project in html code
		var title = $(this).data('title')
		if ($(this).data('title') == '') {
			title = 'no title set'
		}
		var desc = $(this).data('desc')
		$(this).find('.project__title').text(title)
		$(this).find('.project__desc').text(desc)
	})

	$('.project').click(function () {
		//make some div.slider__img in div.slider__images
		var category = $('.projects-title').text().toLowerCase().replace(' ', '-')

		var items = []
		$('.slider__images').empty()
		if (category == 'all-projects') {
			items = $('.project')
			items.each(makeImg)
			$('.slider__title').text(items.first().data('title'))
		} else {
			$('.project').each(function () {
				if ($(this).hasClass(category)) {
					items.push($(this))
				}
			})
			$.each(items, makeImg)
			$('.slider__title').text(items[0].data('title'))
		}
		//show modal slider by clicking on each project
		$('.slider').addClass('slider-open')
		//show backdrop
		$('.backdrop').addClass('backdrop-show')
		//hide all slides
		$('.slider__img').hide()
		//show the first slide
		var title = $(this).data('title')
		$('.slider__title').text(title)
		$('.slider__img').each(function () {
			if ($(this).data('title') == title) {
				$(this).addClass('show').show()

			}
		})
		//get the number of slider images
		var total = $('.slider__img').length
		$('.total').text(total)

		//set index of the first image

		var current = $('.slider__img.show').prevAll().length + 1
		$('.current').text(current)

	})
	$('.slider .icon').click(function () {
		//hide backdrop by clicking on close icon
		$('.backdrop').removeClass('backdrop-show')
		//close modal slider by clicking on close icon
		$('.slider').removeClass('slider-open')
	})

	//switch slide to the next one
	$('.next').click(slideNext)
	//switch slide to the previous one
	$('.prev').click(slidePrev)

	function makeImg() {
		var imgSrc = $(this).find('.image').attr('src')
		var title = $(this).data('title')

		var imgItem = `<div class="slider__img" data-title="${title}"><img src="${imgSrc}" class="image"></div>`
		$('.slider__images').append(imgItem)
	}

	function slideNext() {
		var last = $('.slider__img').last()
		if ($('.slider__img.show').is(last)) {
			$('.slider__img.show').removeClass('show').addClass('hidden')
			$('.slider__img').first().addClass('show')
		} else {
			$('.slider__img.show').removeClass('show').addClass('hidden').next().addClass('show')
		}
		var current = $('.slider__img.show').prevAll('.slider__img').length + 1
		var title = $('.slider__img.show').data('title')
		$('.slider__title').text(title)
		$('.slider__img.hidden').hide()
		$('.slider__img.show').fadeOut(100).fadeIn(300)
		$('.current').text(current)
	}

	function slidePrev() {
		var first = $('.slider__img').first()
		if ($('.slider__img.show').is(first)) {
			$('.slider__img.show').removeClass('show').addClass('hidden')
			$('.slider__img').last().addClass('show')
		} else {
			$('.slider__img.show').removeClass('show').addClass('hidden').prev().addClass('show')
		}
		var current = $('.slider__img.show').prevAll('.slider__img').length + 1
		var title = $('.slider__img.show').data('title')
		$('.slider__title').text(title)
		$('.slider__img.hidden').hide()
		$('.slider__img.show').fadeOut(100).fadeIn(300)
		$('.current').text(current)

	}

})
