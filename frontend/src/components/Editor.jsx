import React, { useContext, useEffect, useState } from 'react';
import AceEditor from "react-ace";
// import io from "socket.io-client"
import socket from '../socket';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { CiSaveDown2 } from "react-icons/ci";
import axios from 'axios';
import Cookies from 'js-cookie';
import { codeContext } from '../context/codeContext';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-golang";



import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-solarized_light";

import "ace-builds/src-noconflict/ext-language_tools";
import { useNavigate } from 'react-router-dom';


function onChange(newValue) {
  socket.emit('code-update', newValue);
}

const fontSizes = [
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
  ];

const themes = [
    "monokai",
    "github",
    "solarized_dark",
    "dracula",
    "eclipse",
    "tomorrow_night",
    "tomorrow_night_blue",
    "xcode",
    "ambiance",
    "solarized_light",
  ].sort();

  const langs = [
    "c_cpp",
    "java",
    "python",
    "golang"
  ]

function Editor() {
    const { code, setCode } = useContext(codeContext);
    const [title, setTitle] = useState('temp');
    const [theme, setTheme] = useState('tomorrow_night_blue');
    const [lang, setLang] = useState('java');
    const [fontSize, setFontSize] = useState(16);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    // const [room, setRoom] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
        const room = urlParams.get('room');
    useEffect(() => {
        
        console.log(room);
        // if (room) {
        //   setRoom(room);
        //   socket.emit('join-room', room);
        // }
    
        socket.on('theme-update', (data) => {
          setTheme(data.theme);
        });
    
        socket.on('lang-update', (data) => {
          setLang(data.lang);
        });
    
        socket.on('font-size-update', (data) => {
          setFontSize(data.fontSize);
        });
    
        socket.on('code-update', (data) => {
          setCode(data.code);
        });
    
        socket.on('input-update', (data) => {
          setInput(data.input);
        });
    
        socket.on('output-update', (data) => {
          setOutput(data.output);
        });
    
        return () => {
          // socket.emit('leave-room', room);
          socket.off('theme-update');
          socket.off('lang-update');
          socket.off('font-size-update');
          socket.off('code-update');
          socket.off('input-update');
          socket.off('output-update');
        };
      }, []);

      const handleCodeChange = (newValue) => {
        console.log(newValue)
        setCode(newValue);
        socket.emit('code-update', { room, code: newValue });
      };

      const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        socket.emit('theme-update', { room, theme: newTheme });
      }

      const handleLangChange = (newLang) => {
        setLang(newLang);
        socket.emit('lang-update', { room, lang: newLang });
      }
    
      const handleInputChange = (newValue) => {
        setInput(newValue);
        socket.emit('input-update', { room, input: newValue });
      };
      
      const handleOutputChange = (newValue) => {
        setOutput(newValue);
        socket.emit('output-update', { room, output: newValue });
      }

      const handleSave = () => {
        console.log(Cookies.get('access_token'));
        const tempTitle = prompt('Enter the title of the file');
        if (!tempTitle) {
          alert("Title is required to save the file");
          return;
        }
        setTitle(tempTitle);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log(userInfo);
        if (!userInfo) {
          alert("User information is missing");
          return;
        }
        const data = {
          title: tempTitle,
          code: code,
          userId: userInfo.user._id
        };

        axios.post('http://localhost:5000/api/create', data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.accessToken}`
          }
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      };
      

      const handleRun = () => {
        fetch('http://localhost:3000/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                input: input,
                language: lang,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (!data.output) {
              setOutput(data.error)
            }
            else {
              setOutput(data.output);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      }

      useEffect(() => {
        handleLangChange(lang);
      }, [lang]);

      useEffect(() => {
        handleThemeChange(theme);
      }, [theme]);

      useEffect(() => {
        handleOutputChange(output);
      }, [output]);

    return (
        <div className='z-1'>
            <div className='flex gap-3'>
                <div>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        {themes.map((theme, index) => (
                            <option key={index} value={theme} >
                                {theme}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={lang} onChange={(e) => setLang(e.target.value)}>
                        {langs.map((lang, index) => (
                            <option key={index} value={lang} >
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))}>
                        {fontSizes.map((font, index) => (
                            <option key={index} value={font} >
                                {font}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='w'>
                  <button onClick={handleSave}>
                    <CiSaveDown2 />
                  </button>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/2'>
                    <div className="bg-zinc-700 p-1 border-r-2">
                        <div className="text-white font-mono font-semibold">
                        WRITE YOUR CODE HERE
                        </div>
                    </div>
                    <AceEditor className='border-2'
                        mode="java"
                        theme={theme}
                        fontSize={fontSize}
                        onChange={handleCodeChange}
                        width='100%'
                        value={code}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                    />
                </div>
                <div className='h-1/4 w-1/2'>
                    <div className="bg-zinc-700 p-1 flex flex-row gap-3">
                        <div className="text-white font-mono font-semibold">
                        USER INPUT
                        </div>
                        <button className=' font-mono font-semibold border-2 px-2 bg-green-800' onClick={handleRun}>
                          Run
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        <div className=''>
                            <AceEditor className='border-2'
                                mode="text"
                                theme={theme}
                                fontSize={fontSize}
                                onChange={handleInputChange}
                                width='100%'
                                value={input}
                                height={'25vh'}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </div>
                        <div>
                            <div className="bg-zinc-700 p-1">
                                <div className="text-white font-mono font-semibold">
                                CODE OUTPUT
                                </div>
                            </div>

                            <AceEditor className='border-2'
                                mode="text"
                                theme={theme}
                                fontSize={fontSize}
                                onChange={onChange}
                                width='100%'
                                height={'39vh'}
                                value={output}
                                readOnly={true}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
    </div>
  )
}

export default Editor