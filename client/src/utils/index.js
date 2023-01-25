//utils files is that file where we create our function to use

import { surpriseMePrompts } from "../constants";
import FileSaver from 'file-saver';

export const getRandomPrompt=(propmt)=>{
    const randomText=Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt =surpriseMePrompts[randomText]

    if(randomPrompt===propmt) return getRandomPrompt(prompt)

    return randomPrompt
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
  }
