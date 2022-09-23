import TextInput from "../../components/General/TextInput"

function AdminLogin() {
  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center flex-col font-primary">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold">Sign In</h1>
      </div>
      <div className="bg-white w-10/12 sm:w-10/12 md:w-8/12 lg:w-4/12 p-10 rounded-lg">
        <form>
          <TextInput 
            labelText="Email Address" 
            inputType="email"
            inputName=""
            inputPlaceholder="johndoe@gmail.com" 
          />
          <TextInput 
            labelText="Password" 
            inputType="password"
            inputName=""
            inputPlaceholder="must be atleast 5 characters long" 
          />
          <div className="mt-8">
              <input 
                type="submit" 
                value="Sign In" 
                className="bg-blue-500 text-white w-full px-4 py-2 rounded cursor-pointer hover:bg-blue-600" 
              />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin