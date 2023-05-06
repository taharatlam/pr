smoothScroll("#content");
// video play on scroll
// const video = document.querySelector(".video-background");
// const video2 = document.querySelector(".video-background2");
// let src = video.currentSrc || video.src;

function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
    var vids= document.querySelectorAll('.play-vid video');
    vids.forEach(vid=>{
        vid.play();
        vid.pause();
    })
});




// 



var animHeight = window.innerHeight * 3
var animHeight2 = window.innerHeight * 5


var vidsec = document.querySelectorAll('.vid-sec');

vidsec.forEach((container) => {

    let video = container.querySelector('video')

    let sctl = gsap.timeline({
        defaults: {
            duration: 1
        },
        scrollTrigger: {
            trigger: container,
            start: "0% 0%",
            end: "+=200%",
            scrub: true,
            markers: false
        }
    });
    once(video, "loadedmetadata", () => {
        sctl.fromTo(
            video,
            {
                currentTime: 0
            },
            {
                currentTime: video.duration || 1
            }
        );
    });
})


// scroll 1

let scroll1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".header-combiner",
        start: "top top",
        end: "bottom bottom",
        markers: false,
        // pin: true,
        scrub: 2,
    }
});

scroll1.to('.header-combiner .lines', 1, {
    y: "-50px",
    opacity: 0,
    stagger: 0.2
})
scroll1.to('.header-combiner .head-gif', 1, {
    y: "-50px",
    scale: 1.1,
    opacity: 0,
}, "-=0.2")


let scroll12 = gsap.timeline({
    scrollTrigger: {
        trigger: ".vd-gr-sec",
        start: "top center",
        end: "bottom bottom",
        markers: false,
        // pin: true,
        scrub: 2,
    }
});

scroll12.from('.p-big', 1, {
    y: "50px",
    opacity: 0,
})


let scroll3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".gr--sec--0",
        start: "top center",
        end: "bottom bottom",
        markers: false,
        // pin: true,
        scrub: 2,
    }
});

scroll3.from('.gr--sec--0 .painting--01 img', 1, {
    y: "100px",
    opacity: 0,
    stagger: 0.2
})


let vidsecc = gsap.timeline({
    scrollTrigger: {
        trigger: ".vid-sec",
        start: "top top",
        end: "+=200%",
        markers: false,
        pin: true,
        scrub: 2,
    }
});

vidsecc.from('.vid-sec .vid-play', 1, {
    // y: "100%",
    // opacity: 0,
})
vidsecc.fromTo('.vid-sec .vid-play', 1, {
    // y: "100%",
    opacity: 0,
}, {
    opacity: 0.85,
})
vidsecc.from('.vid-sec .cnn', 1, {
    y: "150%",
    // opacity: 0,
})
vidsecc.to('.vid-sec .cnn', 1, {
    y: "-50%",
    opacity: 0,
})
vidsecc.to('.vid-sec .vid-play', 1, {
    // y: "-50%",
    opacity: 0,
}, "-=0.8")
vidsecc.to('.vid-sec .vid-play', 1, {
    // y: "-50%",
    opacity: 0,
}, "-=0.5")
// text animation


$.fn.highlghtWrap = function () {
    this.each(function () {
        var current = $(this);
        var text = current.text();
        var words = text.split(' ');
        var line = '';
        var lines = [];

        current.text(words[0]);
        var height = current.height();
        line = words[0];
        for (var i = 1; i < words.length; i++) {
            current.text(current.text() + ' ' + words[i]);

            if (current.height() > height) {
                lines.push(line);
                line = words[i];
                height = current.height();
            } else {
                line = line + ' ' + words[i];
            }
        }
        lines.push(line);
        current.html('');
        $.each(lines, function (v, a) {
            current.html(current.html() + '<div class="line"><span>' + a +
                '</span></div>');
        });
    });
}

$('.anim-text').highlghtWrap();
if ($('.line').length) {
    $('.line').each(function () {
        var str = $(this).find('span').text();
        if (!str.replace(/\s/g, '').length) {
            $(this).css('display', 'none');
        }
    })
}

let animConatiner = document.querySelectorAll(".has-anim-text");

animConatiner.forEach((container) => {
    let text = $(container).find('.line span');

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            // toggleActions: "restart none none reset",
            markers: false,
            start: `top 65%`,
        },
    });
    tl.from(text, 0.8, {
        yPercent: 100,
        opacity: 0,
        ease: Power2.out,
        stagger: 0.2
    })
});



// smooth scrolling
function smoothScroll(content, viewport, smoothness) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 1.8;

    gsap.set(viewport || content.parentNode, {
        overflow: "hidden",
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    });
    gsap.set(content, {
        overflow: "visible",
        width: "100%"
    });

    let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => content.style.overflow = "visible",
        killScrub = trigger => {
            let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0];
            scrub && scrub.pause();
            trigger.animation.progress(trigger.progress);
        },
        height, isProxyScrolling;

    function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible"
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
    }

    ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
    })
    ScrollTrigger.defaults({
        scroller: content
    });
    ScrollTrigger.prototype.update = p => p;

    ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
            if (arguments.length) {
                isProxyScrolling = true;
                setProp(-value);
                setScroll(value);
                return;
            }
            return -getProp("y");
        },
        scrollHeight: () => document.body.scrollHeight,
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    return ScrollTrigger.create({
        animation: gsap.fromTo(content, {
            y: 0
        }, {
            y: () => document.documentElement.clientHeight - height,
            ease: "none",
            onUpdate: ScrollTrigger.update
        }),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: self => {
            if (isProxyScrolling) {
                killScrub(self);
                isProxyScrolling = false;
            }
        },
        onRefresh: killScrub
    });
}

gsap.utils.toArray(".text-highlight").forEach((highlight) => {
    ScrollTrigger.create({
        trigger: highlight,
        markers: false,
        start: "top center",
        end: "bottom 35%",
        onEnter: () => highlight.classList.add("active"),
        onLeave: () => highlight.classList.remove("active"),
        onLeaveBack: () => highlight.classList.remove("active"),
        onEnterBack: () => highlight.classList.add("active"),
    });
});

let revealContainers = document.querySelectorAll(".reveal");

revealContainers.forEach((container) => {
    let image = container.querySelector("img");
    let video = container.querySelector("video");
    // let image = container.childNodes;
    var hasBottomClass = container.classList.contains("from-bottom");
    var contain = hasBottomClass ? container.parentElement : container;
    var prcnt = hasBottomClass ? "15%" : "top";
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: contain,
            // toggleActions: "restart none none reset",
            markers: false,
            start: `${prcnt} 65%`,
        },
    });
    tl.set(container, {
        autoAlpha: 1,
    });
    if (container.classList.contains("from-bottom")) {
        tl.from(container, 1.5, {
            yPercent: 100,
            ease: Power2.out,
        });
        tl.from(image, 1.5, {
            yPercent: -100,
            scale: 1.3,
            delay: -1.5,
            ease: Power2.out,
        });
    } else {
        tl.from(container, 1.5, {
            xPercent: -100,
            ease: Power2.out,
        });
        if(image){
            tl.from(image, 1.5, {
                xPercent: 100,
                scale: 1.3,
                delay: -1.5,
                ease: Power2.out,
            });
        }
        if(video){
            tl.from(video, 1.5, {
                xPercent: 100,
                scale: 1.3,
                delay: -1.5,
                ease: Power2.out,
            });
        }
    }

   
});

// window.addEventListener('scroll', onScroll);
var pImg = $('.sticky-col');

function onScroll() {
    // console.log(, $(window).scrollTop());
    var btSr = ($('#sticky-sec').innerHeight() + $('#sticky-sec').offset().top) - $(window).innerHeight();
  
    if ($(window).innerWidth() > 1000) {
        if ($('#sticky-sec').offset().top < $(window).scrollTop() - 20 && $(window).scrollTop() + 120 < btSr) {
            var r = pImg.offset().right;
            pImg.css('position', 'fixed');
            pImg.css('z-index', '999');
            pImg.css('left', r);
            pImg.css('top', '110px');


        } else {
            pImg.css('position', 'unset');
            pImg.css('top', '85px');
        }
    }


}

// var ppWidth = $('.sticky-col').innerWidth();
// $('.sticky-col').css('min-height', ppWidth);
// $('.sticky-col').css('height', ppWidth);


// page opener
pageOpener()
function pageOpener(){
    var opener = gsap.timeline();

    opener.to('#opener .loading-text', 0.8, {
        opacity: 0.15,
        y: "0px",
        ease: Power2.easeOut,
    }, "+=0.5")
    opener.to('#opener span', 0.5, {
        opacity: 1,
        y: "0px",
        ease: Expo.easeOut,
    }, "-=0.1")
    opener.to('#opener span', 0.95, {
        scaleX: 1.2,
        ease: Power2.easeOut,
    }, "-=0.3")
    opener.to('#opener span', 0.8, {
        scaleY: 1.2,
        ease: Power2.easeInOut,
    }, "-=0.2")
    opener.to('#opener', 0.2, {
        opacity: 0,
        pointerEvents: "none",
        ease: Power2.easeInOut,
    })

    // opener.from('.logo', 0.8, {
    //     y: "20px",
    //     opacity: 0,
    //     ease: Expo.easeOut,
    // })
    opener.from('.menu-btn', 0.8, {
        x: "20px",
        opacity: 0,
        ease: Expo.easeOut,
    })

    opener.from('.lines h1', 0.8, {
        y: "100%",
        opacity: 0,
        stagger: 0.15,
        ease: Expo.easeOut
    }, "-=1")

    opener.from('.header-combiner .head-gif', 0.8, {
        opacity: 0,
        ease: Expo.easeOut
    }, "-=0.2s")

    opener.from('.header-combiner .fixed-el', 0.8, {
        y: "50px",
        opacity: 0,
        ease: Expo.easeOut
    }, "-=0.8")

    opener.eventCallback("onComplete", function(){
        $('body').css('overflow', 'unset');
        $('body').css('padding-right', '0px');
    })

}