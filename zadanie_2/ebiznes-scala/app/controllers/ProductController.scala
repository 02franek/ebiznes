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
}
