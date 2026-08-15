import RegisterForm from "@/app/components/auth/register/RegisterForm";

export default async function Register() {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="w-[600px] mx-auto flex justify-center items-center mt-8 border border-gray-200 rounded-md p-4">
                <div className="w-full">
                    <header className="flex justify-center items-center gap-4 flex-col mt-4">
                        <div className="bg-green-200 text-center p-2 rounded-full w-16">
                            <span className="bi-trophy text-2xl text-teal-500" />
                        </div>

                        <h1 className="text-2xl font-bold">Register your Team</h1>
                        <p className="text-gray-500">Join the league and book grounds easily</p>
                    </header>

                    {/* Register Form */}
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}