var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3)
var param1 = 5
var cpOffset = param1 * KAPPA
go.Shape.defineFigureGenerator('myCloud', function (shape, w, h) {
  const width = 160
  const height = 120
          return new go.Geometry()
            .add(
              new go.PathFigure(width * 0.12, 0.32 * height, true)
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.45, height * 0.12, width * 0.12, 0.32 - cpOffset,width * 0.45-cpOffset, height * 0.12-3*cpOffset))
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.75, height * 0.16, width * 0.45+cpOffset, height * 0.12 - 7*cpOffset ,width * 0.75 + cpOffset, height * 0.16 - 7*cpOffset))
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.93, height * 0.54,  width * 0.75 + 13 * cpOffset, height * 0.16-2*cpOffset, width * 0.93 + 6 * cpOffset, height * 0.54 - 3 * cpOffset))
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.75, height * 0.9, width * 0.93 + 8* cpOffset, height * 0.54 + 8 * cpOffset, width * 0.75 + 8 * cpOffset, height * 0.9 + 4* cpOffset))
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.46, height * 0.9, width * 0.75 - 3 * cpOffset, height * 0.9 + 5 * cpOffset, width * 0.46 + 3 * cpOffset, height * 0.9 + 5* cpOffset))
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.15, height * 0.7, width * 0.46 - 3 * cpOffset, height * 0.9 + 4 * cpOffset, width * 0.15 - cpOffset, height * 0.7 + 11 * cpOffset))
                .add(new go.PathSegment(go.PathSegment.Bezier,
                  width * 0.12, 0.32 * height, width * 0.15 - 8 * cpOffset, height * 0.7 + cpOffset, width * 0.12 - 8 * cpOffset, 0.32 * height + 3 * cpOffset))
            )
            .setSpots(0.05, 0.05, 0.85, 0.8)
        })


go.Shape.defineFigureGenerator('fiveStar', function (shape, w, h) {
  const figureGeo = magicPentagon.drawPolygon(5, 0.4, w, h)
  const normalizeGeo = go.Geometry.parse(figureGeo)
  return normalizeGeo
})
go.Shape.defineFigureGenerator('DoubleBrace', function (shape, w, h) {
  var param1 = (shape && shape.parameter1) || 5
  param1 = Math.min(param1, w / 4, h / 4)
  var cpOffset = param1 * KAPPA
  const dparam1 = 2 * param1
  var geo = new go.Geometry()
    .add(
      // 左侧
      new go.PathFigure(dparam1, 0, true)
        .add(new go.PathSegment(go.PathSegment.Bezier, param1, param1, dparam1 - cpOffset, 0, param1, param1 - cpOffset))
        .add(new go.PathSegment(go.PathSegment.Line, param1, h / 2 - param1))
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            0,
            h / 2,
            param1,
            h / 2 - param1 + cpOffset,
            cpOffset,
            h / 2
          )
        )
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            param1,
            h / 2 + param1,
            cpOffset,
            h / 2,
            param1,
            h / 2 + param1 - cpOffset
          )
        )
        .add(new go.PathSegment(go.PathSegment.Line, param1, h - param1))
        .add(new go.PathSegment(go.PathSegment.Bezier, dparam1, h, param1, h - param1 + cpOffset, param1 + cpOffset, h))
        // 右侧
        .add(new go.PathSegment(go.PathSegment.Move, w - dparam1, 0))
        .add(
          new go.PathSegment(go.PathSegment.Bezier, w - param1, param1, w - param1 - cpOffset, 0, w - param1, param1 - cpOffset)
        )
        .add(new go.PathSegment(go.PathSegment.Line, w - param1, h / 2 - param1))
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            w,
            h / 2,
            w - param1,
            h / 2 - param1 + cpOffset,
            w - cpOffset,
            h / 2
          )
        )
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            w - param1,
            h / 2 + param1,
            w - cpOffset,
            h / 2,
            w - param1,
            h / 2 + param1 - cpOffset
          )
        )
        .add(new go.PathSegment(go.PathSegment.Line, w - param1, h - param1))
        .add(new go.PathSegment(go.PathSegment.Bezier, w - dparam1, h, w - param1, h - param1 + cpOffset, w - dparam1 + cpOffset, h))
    )
  return geo
})
go.Shape.defineFigureGenerator('DoubleBraceH', function (shape, w, h) {
  var param1 = (shape && shape.parameter1) || 5
  param1 = Math.min(param1, w / 4, h / 4)
  var cpOffset = param1 * KAPPA
  const dparam1 = 2 * param1
  var geo = new go.Geometry()
    .add(
      // 左侧
      new go.PathFigure(0, dparam1, true)
        .add(new go.PathSegment(go.PathSegment.Bezier, param1, param1, 0, dparam1 - cpOffset, param1 - cpOffset, param1))
        .add(new go.PathSegment(go.PathSegment.Line, w / 2 - param1, param1))
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            w / 2,
            0,
            w / 2 - param1 + cpOffset,
            param1,
            w / 2,
            cpOffset
          )
        )
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            w / 2 + param1,
            param1,
            w / 2,
            cpOffset,
            w / 2 + param1 - cpOffset,
            param1
          )
        )
        .add(new go.PathSegment(go.PathSegment.Line, w - param1, param1 ))
        .add(new go.PathSegment(go.PathSegment.Bezier, w, dparam1, w - param1 + cpOffset,param1, w, dparam1 - cpOffset))
        // 右侧
        .add(new go.PathSegment(go.PathSegment.Move, 0, h - dparam1))
        .add(
          new go.PathSegment(go.PathSegment.Bezier, param1, h - param1, 0, h - dparam1 + cpOffset, param1 - cpOffset, h - param1)
        )
        .add(new go.PathSegment(go.PathSegment.Line, w / 2 - param1, h - param1))
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            w / 2,
            h,
            w / 2 - param1 + cpOffset,
            h - param1,
            w / 2,
            h - cpOffset
          )
        )
        .add(
          new go.PathSegment(
            go.PathSegment.Bezier,
            w / 2 + param1,
            h - param1,
            w / 2,
            h - cpOffset,
            w / 2 + param1 - cpOffset,
            h - param1
          )
        )
        .add(new go.PathSegment(go.PathSegment.Line, w - param1, h - param1))
        .add(new go.PathSegment(go.PathSegment.Bezier, w, h - dparam1, w - param1 + cpOffset, h - param1, w, h - dparam1 + cpOffset))
    )
  return geo
})
go.Shape.defineFigureGenerator('DoubleBracket', function (shape, w, h) {
  var param1 = (shape && shape.parameter1) || 5
  param1 = Math.min(param1, w / 2, h / 2)
  var cpOffset = param1 * KAPPA
  var geo = new go.Geometry()
    .add(
      // 左侧
      new go.PathFigure(param1, 0, true)
        .add(new go.PathSegment(go.PathSegment.Bezier, 0, param1, param1 - cpOffset, 0, 0, param1 - cpOffset))
        .add(new go.PathSegment(go.PathSegment.Line, 0, h - param1))
        
        .add(new go.PathSegment(go.PathSegment.Bezier, param1, h, 0, h - param1 + cpOffset, param1 - cpOffset, h))
        // 右侧
        .add(new go.PathSegment(go.PathSegment.Move, w - param1, 0))
        .add(
          new go.PathSegment(go.PathSegment.Bezier, w, param1, w - param1 + cpOffset, 0, w, param1 - cpOffset)
        )
        .add(new go.PathSegment(go.PathSegment.Line, w, h - param1))
        .add(new go.PathSegment(go.PathSegment.Bezier, w - param1, h, w, h - param1 + cpOffset, w - param1 + cpOffset, h))
    )
  return geo
})
go.Shape.defineFigureGenerator('DoubleBracketH', function (shape, w, h) {
  var param1 = (shape && shape.parameter1) || 5
  param1 = Math.min(param1, w / 2, h / 2)
  var cpOffset = param1 * KAPPA
  var geo = new go.Geometry()
    .add(
      // 左侧
      new go.PathFigure(0, param1, true)
        .add(new go.PathSegment(go.PathSegment.Bezier, param1, 0, 0, param1 - cpOffset, param1 - cpOffset, 0))
        .add(new go.PathSegment(go.PathSegment.Line, w - param1, 0))
        .add(new go.PathSegment(go.PathSegment.Bezier, w, param1, w - param1 + cpOffset,0, w, param1 - cpOffset))
        // 右侧
        .add(new go.PathSegment(go.PathSegment.Move, 0, h - param1))
        .add(
          new go.PathSegment(go.PathSegment.Bezier, param1, h, 0, h - param1 + cpOffset, param1 - cpOffset, h)
        )
        .add(new go.PathSegment(go.PathSegment.Line, w - param1, h))
        .add(new go.PathSegment(go.PathSegment.Bezier, w, h - param1, w - param1 + cpOffset, h, w, h - param1 + cpOffset))
    )
  return geo
})