import { SiPanasonic } from "react-icons/si"
import { checkHeading, replaceHeadingStarts } from "./Helper"
import {  useEffect,useState } from "react";
// import { dark } from 'react-syntax-highlighter/dist/esn/styles/prism';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from "react-markdown";
import SyntaxHightlighter from 'react-syntax-highlighter';

const  Answer = ({ans,totalResult, index, type}) => {
    // console.log(ans,key);
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer]=useState(ans);
    

    useEffect(() =>{
        if(checkHeading(ans))
        {
            setHeading(true);
            setAnswer(replaceHeadingStarts(ans))
        }
       

    }, [])
    const renderer={
        code({node, inline, className,children,...props}){
            // const match =  /language-(\w+)/.exec(className || '')
            const match = /language-(\w+)/.exec(className || '');
            return !inline &&match?(
                <SyntaxHightlighter
                {...props}
                children={String(children).replace(/\n$/,'')}
                language={match[1]}
                style={oneDark}
                pretag="div"
                />
            ):(
                <code {...props} className={className}>
                    {children}
                </code>
            )
            
        }
    }
    return (
        <>
       
       {
        index==0  && totalResult > 1 ? <span className="pt-2 text-xl block text-white">{answer}</span>:
        heading? <span className="pt-2 text-lg block text-white">{answer}</span>:
        <span className={type=='q'? 'pl-1':'pl-5'}>
            <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
       }
      
        </>
    )
}
export default Answer;