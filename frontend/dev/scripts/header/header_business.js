(function () {

  var $lastClickedFeaturedDept = null;

  function selectLastClickedFeaturedDept () {
    if ($lastClickedFeaturedDept) {
      $lastClickedFeaturedDept.addClass("featured-departments-click-effect");
      showFeaturedDeptContent($lastClickedFeaturedDept);
    }
  }

  function unSelectLastClickedFeaturedDept () {
    if ($lastClickedFeaturedDept) {
      $lastClickedFeaturedDept.removeClass("featured-departments-click-effect");
      hideFeaturedDeptContent($lastClickedFeaturedDept);
    }
  }

  function showFeaturedDeptContent ($ele) {
    $ele.find(".business-featured-department-content").css({
      "display": "block",
      "z-index": "1"
    });
  }

  function hideFeaturedDeptContent ($ele) {
    $ele.find(".business-featured-department-content").css({
      "display": "none",
      "z-index": "0"
    });
  }

  $(".business-featured-department").hover(function () {
    unSelectLastClickedFeaturedDept();
    showFeaturedDeptContent($(this));
  }, function () {
    hideFeaturedDeptContent($(this));
  });

  $(".business-featured-departments").hover(null, selectLastClickedFeaturedDept);

  $(".business-featured-department").click(function (ev) {
    if ($(".business-featured-department-content")
        .find(ev.target).length === 0) {
      $(this).addClass("featured-departments-click-effect");
      $lastClickedFeaturedDept = $(ev.currentTarget);
    }
  });

})();
