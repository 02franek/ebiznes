package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Category
import scala.collection.mutable.ListBuffer

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
    private val categoryList = new ListBuffer[Category]()

    categoryList += Category(1, "Dewocjonalia")
    categoryList += Category(2, "Sprzęt Strażacki")
    
    def getAll() = Action { implicit request: Request[AnyContent] =>
        Ok(Json.toJson(categoryList))
    }
    
    def getById(id: Long) = Action { implicit request: Request[AnyContent] =>
        categoryList.find(_.id == id) match {
            case Some(category) => Ok(Json.toJson(category))
            case None => NotFound(Json.obj("error" -> s"Category with id $id not found"))
        }
    }
    
    def add() = Action { implicit request: Request[AnyContent] =>
        request.body.asJson.map(_.validate[Category] match {
            case JsSuccess(category, _) =>
                categoryList += category
                Created(Json.toJson(category))
            case JsError(_) => BadRequest(Json.obj("error" -> "Invalid JSON format"))
        }).getOrElse(BadRequest(Json.obj("error" -> "JSON data is required")))
    }
    
    def update(id: Long) = Action { implicit request: Request[AnyContent] =>
        request.body.asJson.map(_.validate[Category] match {
            case JsSuccess(updatedCategory, _) =>
                val index = categoryList.indexWhere(_.id == id)
                if (index != -1) {
                    categoryList.update(index, updatedCategory)
                    Ok(Json.toJson(updatedCategory))
                } else {
                    NotFound(Json.obj("error" -> s"Category with id $id not found"))
                }
            case JsError(_) => BadRequest(Json.obj("error" -> "Invalid JSON format"))
        }).getOrElse(BadRequest(Json.obj("error" -> "JSON data is required")))
    }

    def delete(id: Long) = Action { implicit request: Request[AnyContent] =>
        val index = categoryList.indexWhere(_.id == id)
        if (index != -1) {
            categoryList.remove(index)
            Ok(Json.obj("message" -> s"Category with id $id deleted successfully"))
        } else {
            NotFound(Json.obj("error" -> s"Category with id $id not found"))
        }
    }

}