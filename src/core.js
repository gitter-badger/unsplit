function $(element) {
    if(typeof element === "string") {
        $element.selected = document.querySelector(element);
    } else {
        $element.selected = element;
    }
    return $element;
}

var $browser = {
    belowIE10: function() {
      return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
    }
};

var $scope = {};

var $element = {
    selected: {},
    ready: function(onLoad) {
        window.onload = function() {
            onLoad();

            var templates = document.querySelectorAll('[data-template]');

            for (i = 0; i < templates.length; i++) {
                var template = $(templates[i]),
                    attrs = template.attributes(),
                    url   = attrs["data-template"].value;

                $ajax.get(url).success(function(contents) {
                    template.template($scope, contents);
                });
            }
        }
    },
    attr: function (value, newValue) {
        for (i = 0; i < this.selected.attributes.length; i++) {
            var attribute = this.selected.attributes[i];

            if (attribute.name === value) {
                if(newValue) {
                    attribute.value = newValue;
                }
                return attribute.value;
            }
        }
    },
    attributes: function () {
        return this.selected.attributes;
    },
    hasClass: function (theClass) {
        for (i = 0; i < this.selected.attributes.length; i++) {
            var attribute = this.selected.attributes[i];
            if (attribute.name === "class") {
                var classes = attribute.value.split(" ");
            }
        }
        for (i = 0; i < classes.length; i++) {
            if(classes[i] === theClass){
                var status = true;
            }
        }
        if(status === true) {
            return true;
        } else {
            return false;
        }
    },
    append: function (item) {
        this.selected.innerHTML += item;
        return this;
    },
    html: function (newHTML) {
        if(newHTML) {
            this.selected.innerHTML = newHTML;
            return this;
        } else {
            return this.selected.innerHTML;
        }
    },
    addClass: function (newClass) {
        if (this.selected.getAttribute("class") === null) {
            var att = document.createAttribute("class");
                att.value = newClass;
                this.selected.setAttributeNode(att);
        } else {
            var att = this.selected.getAttribute("class") + " " + newClass;
            this.selected.setAttribute("class", att);
        }
        return this;
    },
    removeClass: function (deleteClass) {
        for (i = 0; i < this.selected.attributes.length; i++) {
            var attribute = this.selected.attributes[i];
            if (attribute.name === "class" && attribute.value !== "") {
                attribute.value = "";
            }
        }
        return this;
    },
    click: function(toRun) {
        this.selected.onclick = toRun;
        return this;
    },
    fadeIn: function () {
        var el = this.selected;
        if (el.classList.contains('is-hidden')) {
            el.classList.remove('is-hidden');
        }
        el.style.opacity = 0;

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += 0.1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    },
    fadeOut: function () {
        var el = this.selected;
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= 0.1) < 0) {
                el.style.display = 'none';
                el.classList.add('is-hidden');
            } else {
                requestAnimationFrame(fade);
            }
        })();
    },
    ga: function(category, label, value) {
        //ga('send', 'event', category, 'click', label, value);
        console.log("send", "event", category, "click", label, value);
        return this;
    },
    template: function(input, template) {
        if(typeof Handlebars === "undefined") {
            if(typeof input !== "object") {
                if(template) {
                    var complied = Mustache.render(template, {data: input});
                    //var compiled = Handlebars.compile(template);
                    this.selected.innerHTML += complied;
                } else {
                    throw new Error("you have not specified a template");
                }
            } else {
                if(/<[a-z][\s\S]*>/i.test(input.template)) {
                    var compiled = Mustache.render(input.template, { data: input.data });
                    this.selected.innerHTML += compiled;
                } else {
                    var handle = Mustache.render(template, input);
                    this.selected.innerHTML += handle;
                }
            }
        } else {
            if(typeof input !== "object") {
                if(template) {
                    var compiled = Handlebars.compile(template);
                    this.selected.innerHTML += compiled({ data: input });
                } else {
                    throw new Error("you have not specified a template");
                }
            } else {
                if(/<[a-z][\s\S]*>/i.test(input.template)) {
                    var compiled = Handlebars.compile(input.template);
                    this.selected.innerHTML += compiled({ data: input.data });
                } else {
                    var handle = Handlebars.compile(template),
                        html = handle(input);

                    this.selected.innerHTML += html;
                }
            }
        }
        return this;
    }
};