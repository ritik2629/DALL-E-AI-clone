//utils files is that file where we create our function to use

import { surpriseMePrompts } from "../constants";

export const getRandomPrompt=(propmt)=>{
    const randomText=Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt =surpriseMePrompts[randomText]

    if(randomPrompt===propmt) return getRandomPrompt(prompt)

    return randomPrompt
}
