module('baidu.ui.carousel');
function createCarousel(c, s) {

	var op = {
		"onbeforescroll" : function() {
			ok(true, 'onbeforescroll event正确派发');
		},
		target : c,
		contentText : [ {
			content : "item-0"
		}, {
			content : "item-1"
		}, {
			content : "item-2"
		}, {
			content : "item-3"
		}, {
			content : "item-4"
		}, {
			content : "item-5"
		} ]
	};
	if (s === true)
		op['orientation'] = 'vertical';
	else if (s === false)
		op['orientation'] = 'horizontal';
	return new baidu.ui.Carousel(op);

}

//TODO
test("carousel width",function(){
    var c = te.dom[0];
	var carousel = createCarousel(c);
	carousel.render();
	var item = carousel.getItem(0);
	equals(carousel.getBody().style.width, item.offsetWidth*(carousel.pageSize)+'px',
			"check carousel width");
});

test("render", function() {
	var c = te.dom[0];
	var carousel = createCarousel(c);
	carousel.render();
	equals(c.firstChild.nextSibling.id, carousel.getId(),
			"carousel container exists");
	equals(c.firstChild.nextSibling.firstChild.id, carousel.getId("scroll"),
			"carousel scrollContainer exists");
	equals(c.firstChild.nextSibling.firstChild.firstChild.id, carousel
			.getId("item" + 0), "carousel itemContainer exists");
});

test("getItem", function() {
	var carousel = createCarousel(te.dom[0]);
	carousel.render();
	carousel.focus(0);
	var item = carousel.getItem(2);
	equals(item.id, carousel.getId("item" + 2), "it's item-2");
});

test("removeItem", function() {
	var carousel = createCarousel(te.dom[0]);
	carousel.render();
	carousel.focus(0);
	var item = carousel.removeItem(0);
	var scroll = document.getElementById(carousel.getId("scroll"));
	ok(scroll.firstChild.id == carousel.getId("item" + 1), "item0 is remove");
	ok(item.id == carousel.getId("item" + 0), "item0 is return");
});

test("scrollTo H", function() {
    var cas, oitem, item, c;
    cas = createCarousel(te.dom[0], false);
	cas.render();
	item = document.getElementById(cas.getId("item" + 2)), c = document.getElementById(cas.getId());
	cas.focus(0);
	cas.scrollTo(2);//scrollLeft 表示滚动条向右拖动的距离 $(c).css('height')
    equals(c.scrollLeft, item.offsetWidth*2,"验证滚动距离是否为两个item的width");
});

test("scrollTo V", function() {
	var cas, oitem, item, c;
	cas = createCarousel(te.dom[0], true);
	cas.render();
	cas.focus(0);
	cas.scrollTo(2);
	item = document.getElementById(cas.getId("item" + 2));
	c = document.getElementById(cas.getId());
	equals(c.scrollTop, item.offsetHeight*2, "验证滚动距离是否为两个item的height");
});

test("focus, _blur", function() {
	var carousel = createCarousel(te.dom[0]);
	carousel.render();
	carousel.focus(1);
	var item = document.getElementById(carousel.getId("item" + 1));
	ok(item.className.indexOf(carousel.getClass("item-focus")) > -1,
			"item1 is focus");

	carousel._blur();
	ok(item.className.indexOf(carousel.getClass("item-focus")) == -1,
			"item1 is blur");

});

test('addItem,no options', function() {
	var carou = new baidu.ui.carousel.Carousel( {
		target : te.dom[0]
	});
	carou.render();
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.innerHTML = 'item-insert';
	carou.addItem(div);
	te.dom.push(div);
	equal(carou.getScrollContainer().lastChild.id, carou.getId("item0"));
});