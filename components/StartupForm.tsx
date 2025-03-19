'use client'
import MDEditor from '@uiw/react-md-editor'

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { toast } from 'sonner'


import {z} from 'zod'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string,string>>({})
    const [pitch, setPitch] = useState('')
    const router = useRouter()
    const handleFormSubmit = async (prevState: any , formData: FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            await formSchema.parseAsync(formValues);

            // console.log(formValues)
            const result = await createPitch(prevState, formData, pitch)
            // console.log(result);

            if(result.status == 'SUCCESS'){

                toast.success('Success', {
                    description: 'Your idea has been registered',
                })
            router.push(`/startup/${result._id}`)
            }

            return result

        } catch(error) {
            
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string,string>)
                
                toast.error("Error",{
                    description:'Please check you input and try again',
                })
                
                return {... prevState, error:"validation failed", status:"Error"}
                
            }
            
            toast.error("Error",{
                description:'An unexpected error has been occured',
            })
            return {
                ... prevState,
                error: 'an unexprected error',
                status: 'error'
            }
            
        } 
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "",status: "INITIAL"});
    return (
    <form action={formAction} className="startup-form">
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
            <Input id='title' name='title' className='startup-form_input'  placeholder='Title'/>
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}

        </div>
        <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' className='startup-form_textarea'  placeholder='Description'/>
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}

        </div>
        <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
            <Input id='category' name='category' className='startup-form_input'  placeholder='Category (Food, Tech, Education)'/>
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}

        </div>
        <div>
            <label htmlFor="link" className='startup-form_label'>Image URL</label>
            <Input id='link' name='link' className='startup-form_input'  placeholder='Image URL'/>
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}

        </div>

        <div data-color-mode = "light">
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
            <MDEditor id = 'pitch' height={300} preview='edit' style={{borderRadius: 20, overflow: "hidden"}} textareaProps={{placeholder: "Briefly describe your idea"}} previewOptions={{disallowedElements: ['style']}} value={pitch} onChange={(value) => setPitch(value as string)} />
            {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}

        </div>

        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
            {isPending? "Submitting..." : "Submit the Idea"}
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default StartupForm
