package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Cart
import scala.collection.mutable.ListBuffer

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
    private val cartList = new ListBuffer[Cart]()

    cartList += Cart(1, 2, 2137) 
    
    def getAll() = Action { implicit request: Request[AnyContent] =>
        Ok(Json.toJson(cartList))
    }
    
    def getById(id: Long) = Action { implicit request: Request[AnyContent] =>
        cartList.find(_.id == id) match {
            case Some(cartItem) => Ok(Json.toJson(cartItem))
            case None => NotFound(Json.obj("error" -> s"Cart item with id $id not found"))
        }
    }
    
    def add() = Action { implicit request: Request[AnyContent] =>
        request.body.asJson.map(_.validate[Cart] match {
            case JsSuccess(cartItem, _) =>
                cartList += cartItem
                Created(Json.toJson(cartItem))
            case JsError(_) => BadRequest(Json.obj("error" -> "Invalid JSON format"))
        }).getOrElse(BadRequest(Json.obj("error" -> "JSON data is required")))
    }
    
    def update(id: Long) = Action { implicit request: Request[AnyContent] =>
        request.body.asJson.map(_.validate[Cart] match {
            case JsSuccess(updatedCartItem, _) =>
                val index = cartList.indexWhere(_.id == id)
                if (index != -1) {
                    cartList.update(index, updatedCartItem)
                    Ok(Json.toJson(updatedCartItem))
                } else {
                    NotFound(Json.obj("error" -> s"Cart item with id $id not found"))
                }
            case JsError(_) => BadRequest(Json.obj("error" -> "Invalid JSON format"))
        }).getOrElse(BadRequest(Json.obj("error" -> "JSON data is required")))
    }

    def delete(id: Long) = Action { implicit request: Request[AnyContent] =>
        val index = cartList.indexWhere(_.id == id)
        if (index != -1) {
            cartList.remove(index)
            Ok(Json.obj("message" -> s"Cart item with id $id deleted successfully"))
        } else {
            NotFound(Json.obj("error" -> s"Cart item with id $id not found"))
        }
    }
}