import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from 'zod'


const signUpForm = z.object({
    studentName: z.string().min(3),
    studentId: z.string().length(11).regex(/^\d{11}$/, { message: "A matrícula deve conter apenas números." }),
    email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

    async function handleSignUp(data: SignUpForm) {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            toast.success('Cadastro bem-sucedido!', {
                action: {
                    label: 'Login',
                    onClick: () => navigate('/sign-in')
                }
            })
        } catch {
            toast.error('Erro ao cadastrar.')
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button variant="default" asChild className="absolute right-8 top-8">
                    <Link to='/sign-in'>
                        Fazer login
                    </Link>
                </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Criar conta
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Tenha controle do seu desempenho acadêmico!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="studentName">Seu nome</Label>
                            <Input 
                                id="studentName" 
                                type="text" 
                                {...register('studentName')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                {...register('email')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="studentId">Sua matrícula</Label>
                            <Input 
                                id="studentId" 
                                type="text" 
                                {...register('studentId')} />
                        </div>

                        <Button disabled={isSubmitting} className="w-full" type="submit">
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos termos de serviço e políticas de privacidade.
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}