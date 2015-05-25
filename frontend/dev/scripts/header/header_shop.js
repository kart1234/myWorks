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
    $ele.find(".shop-featured-department-content").css({
      "display": "block",
      "z-index": "1"
    });
  }

  function hideFeaturedDeptContent ($ele) {
    $ele.find(".shop-featured-department-content").css({
      "display": "none",
      "z-index": "0"
    });
  }

  $(".shop-featured-department").hover(function () {
    unSelectLastClickedFeaturedDept();
    showFeaturedDeptContent($(this));
  }, function () {
    hideFeaturedDeptContent($(this));
  });

  $(".shop-featured-departments").hover(null, selectLastClickedFeaturedDept);

  $(".shop-featured-department").click(function (ev) {
    if ($(".shop-featured-department-content")
        .find(ev.target).length === 0) {
      $(this).addClass("featured-departments-click-effect");
      $lastClickedFeaturedDept = $(ev.currentTarget);
    }
  });

  $("#shop_all_departments_direct_link").click(function () {
    unSelectLastClickedFeaturedDept();
    $("#shop_all_departments_content").show();
  });

  $("#shop_featured_departments_link").click(function () {
    selectLastClickedFeaturedDept();
    $("#shop_all_departments_content").hide();
  });

  $(".shop-department-link").click(function () {
    $(this).parent(".shop-department").find(".shop-department-content").show();
  });

  $(".shop-all-departments-back-link").click(function () {
    $(this).parents(".shop-department-content").hide();
  });

})();
