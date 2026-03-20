package models

import play.api.libs.json._

case class Cart(id: Long, productId: Long, quantity: Int)

object Cart {
    implicit val cartFormat: OFormat[Cart] = Json.format[Cart]
}