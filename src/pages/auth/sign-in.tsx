import { signIn } from "@/api/sign-in"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useMutation } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from 'zod'


const signInForm = z.object({
    matricula: z.string().min(11),
    password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
        defaultValues: {
            matricula: searchParams.get('matricula') ?? '',
        },
    })

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
    })

    async function handleSignIn(data: SignInForm) {
        try {            
            const userData = await authenticate({ matricula: data.matricula, senha: data.password })
            localStorage.setItem("alunoLogado", JSON.stringify(userData.aluno))
            localStorage.setItem("alunoLogadoId", userData.aluno.id)

            const durationMs = 30 * 60 * 1000;
            const expiresAt = Date.now() + durationMs;
            
            localStorage.setItem("sessionExpiresAt", expiresAt.toString());

            navigate("/")
        } catch {
            toast.error('Ocorreu um erro ao tentar acessar o painel. Por favor, tente novamente.')
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button variant="default" asChild className="absolute right-8 top-8">
                    <Link to='/sign-up'>
                        Nova conta
                    </Link>
                </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Acessar Painel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe seus estudos!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="matricula">Sua matricula</Label>
                            <Input id="matricula" type="text" {...register('matricula')} />
                            <Label htmlFor="password">Sua senha</Label>
                            <Input id="password" type="password" {...register('password')} />
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit">Acessar Painel</Button>
                    </form>
                </div>
            </div>
        </>
    )
}