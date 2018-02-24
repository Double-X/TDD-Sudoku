This app uses the MVC architecture.
The views' responsible for updating the doms, which dispatches events to the controller.
The controller's responsible for bridging the views and the models by asking questions with inputs dispatched by the views to the models, 
which answer them with outputs given back to the view.
The models' mostly pure functions and are thus effectively stateless.
The composition root, which is also the app's entry point, combines every module into the whole app.