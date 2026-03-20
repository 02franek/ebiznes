package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Product
import scala.collection.mutable.ListBuffer

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
    private val productList = new ListBuffer[Product]()
    
    productList += Product(1, "Kalendarz OSP", 30.00, "Kalendarz miłośników lania wody i wódki")
    productList += Product(2, "Zdjęcie papieża Jana Pawła II", 21.37, "Selfie największego z Polaków po Małyszu")
    
    def getAll() = Action { implicit request: Request[AnyContent] =>
        Ok(Json.toJson(productList))
    }
    
    def getById(id: Long) = Action { implicit request: Request[AnyContent] =>
        productList.find(_.id == id) match {
            case Some(product) => Ok(Json.toJson(product))
            case None => NotFound(Json.obj("error" -> s"Product with id $id not found"))
        }
    }
    
    def add() = Action { implicit request: Request[AnyContent] =>
        request.body.asJson.map(_.validate[Product] match {
            case JsSuccess(product, _) =>
                productList += product
                Created(Json.toJson(product))
            case JsError(_) =>
                BadRequest(Json.obj("error" -> "Invalid JSON format"))
        }).getOrElse(BadRequest(Json.obj("error" -> "JSON data is required")))
    }
    
    def update(id: Long) = Action { implicit request: Request[AnyContent] =>
        request.body.asJson.map(_.validate[Product] match {
            case JsSuccess(updatedProduct, _) =>
                val index = productList.indexWhere(_.id == id)
                if (index != -1) {
                    productList.update(index, updatedProduct)
                    Ok(Json.toJson(updatedProduct))
                } else {
                    NotFound(Json.obj("error" -> s"Product with id $id not found"))
                }
            case JsError(_) => BadRequest(Json.obj("error" -> "Invalid JSON format"))
        }).getOrElse(BadRequest(Json.obj("error" -> "JSON data is required")))
    }

    def delete(id: Long) = Action { implicit request: Request[AnyContent] =>
        val index = productList.indexWhere(_.id == id)
        if (index != -1) {
            productList.remove(index)
            Ok(Json.obj("message" -> s"Product with id $id deleted successfully"))
        } else {
            NotFound(Json.obj("error" -> s"Product with id $id not found"))
        }
    }

}
