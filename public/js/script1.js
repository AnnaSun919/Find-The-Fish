$("#btn1").on("click", function () {
  var r = $(
    '<textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name="ingredients"></textarea>'
  );
  $(".ingredient").append(r);
});
