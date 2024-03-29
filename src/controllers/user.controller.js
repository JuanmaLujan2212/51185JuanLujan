import UserModel from "../Dao/models/user.js";

class UserController{
    static changeRol = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UserModel.findById(userId);
            const userRol = user.rol;
            if(userRol === "user"){
                user.rol = "premium"
            } else if(userRol === "premium"){
                user.rol = "user"
            } else {
                return res.json({status:"error", message:"no es posible cambiar el role del usuario"});
            }
            await UserModel.updateOne({_id:user._id},user);
            res.send({status:"success", message:"rol modificado"});
        } catch (error) {
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al cambiar el rol del usuario"})
        }
    }
    static updateUserDocument = async (req,res) =>{
        try {
            const userId = req.params.uid
            const user = await UserModel.findById(userId);
            const identificacion = req.files['identificacion']?.[0] || null;
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            const docs = [];
            if(identificacion){
                docs.push({name:"identificacion", reference:identificacion.filename})
            }
            if(domicilio){
                docs.push({name:"domicilio", reference:domicilio.filename})
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference:estadoDeCuenta.filename})
            }
            if(docs.length ===3){
                user.status = "completo"
            }else{
                user.status = "incompleto"
            }
            user.documents = docs;
            console.log(docs)
            console.log("user")
            console.log(user)
            const userUpdate = await UserModel.findByIdAndUpdate(user._id,user)

            res.json({status:"success", message:"Documentos actualizados"})

        } catch (error) {
            console.log(error.message);
            res.json({status:"error", message: "Hubo un error en la carga de los archivos."})
        }
    }
    static getUsers = async (req,res) =>{
        try {
            const result = await UserModel.find();
            res.status(200).json({ status: "success", payload: result });

          } catch (error) {
            res.status(400).json({ status: "error", message: "Error al obtener los usuarios" });
          }
    }
    static delUsers = async (req, res) => {
        try {
            const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
            const result = await UserModel.deleteMany({ last_connection: { $lt: twoDaysAgo } });
    
            res.status(200).json({ status: "success", payload: result });
        } catch (error) {
            res.status(400).json({ status: "error", message: "Error al eliminar usuarios inactivos" });
        }
    }
}

export {UserController}