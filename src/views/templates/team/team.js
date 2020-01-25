import "./team.scss";
import vanillatilt from "vanilla-tilt";
import scrollreveal from "scrollreveal";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

function getCard(element) {
    if (element.classList.contains("human-card")) {
        return element;
    }
    if (element.parentNode !== null) {
        var owner = element.parentNode;

        while (owner !== document.body) {
            if (owner !== null && owner.classList.length > 0 && owner.classList.contains("human-card")) {
                return owner;
            }
            owner = owner.parentNode;
        }
    }

    return null;
}

function work() {
    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    var isEdge = window.navigator.userAgent.indexOf("Edge") > -1;
    var items = document.querySelectorAll(".human-card");
    var lastopened = null;

    function onClick() {
        return function () {
            if (this.classList.contains("open")) {
                this.classList.remove("disp");
                this.classList.remove("open");
            } else {
                this.classList.add("disp");
                this.classList.add("open");
                if (lastopened !== null && lastopened !== this) {
                    lastopened.classList.remove("disp");
                    lastopened.classList.remove("open");
                }
                lastopened = this;
                if (isMobile) {
                    this.scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                        inline: "center"
                    });
                }
            }
        };
    }

    function onLeave() {
        return function () {
            this.classList.remove("disp");
            this.classList.remove("open");
        };
    }

    for (var i = 0; i < items.length; i++) {
        items[parseInt(i)].addEventListener("click", onClick());
        items[parseInt(i)].addEventListener("mouseleave", onLeave());
    }

    if (!isMobile & !isEdge) {
        vanillatilt.init(items, {
            reverse: true, // reverse the tilt direction
            max: 10, // max tilt rotation (degrees)
            perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
            speed: 1000, // Speed of the enter/exit transition
            transition: true, // Set a transition on enter/exit.
            reset: true, // If the tilt effect has to be reset on exit.
            scale: 1.1
        });
    }
    var card;
    window.onscroll = function () {
        if (isMobile) {
            try {
                var viewportwidth = window.innerWidth / 2;
                var doc = document.documentElement;
                var viewportheight = window.innerHeight / 2;
                var elem = document.elementFromPoint(viewportwidth, viewportheight);
                var newcard = getCard(elem);

                if (newcard !== null) {
                    if (card !== null && card.classList.contains("hover")) {
                        card.classList.remove("hover");
                    }
                    card = newcard;
                    if (document.querySelector("body").classList.contains("nav-active") === false) {
                        card.classList.add("hover");
                    }
                } else {
                    if (card !== null && card.classList.contains("hover")) {
                        card.classList.remove("hover");
                        card.classList.remove("disp");
                        card.classList.remove("open");
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        }

        var scrollPosition = document.scrollingElement.scrollTop;
        var body = document.body;

        if (scrollPosition > 170) {
            body.classList.add("nav-bg");
        } else {
            if (body.classList.contains("nav-bg")) {
                body.classList.remove("nav-bg");
            }
        }
    };

    scrollreveal().reveal(items, {
        easing: "ease-in-out",
        distance: "20px"

    });


    document.body.classList.add("nologo");
}

document.onload = work();