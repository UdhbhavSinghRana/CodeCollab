import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import io from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-kotlin";


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

const socket = io('http://localhost:4000');

function onChange(newValue) {
    console.log("change", newValue);

    io.emit('code-update', newValue);
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
    "javascript",
    "rust",
    "kotlin"
  ]

function Editor() {
    const [theme, setTheme] = useState('tomorrow_night_blue');
    const [lang, setLang] = useState('java');
    const [fontSize, setFontSize] = useState(16);
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [room, setRoom] = useState('');


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const room = urlParams.get('room');
        if (room) {
          setRoom(room);
          socket.emit('join-room', room);
        }
    
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
          socket.off('theme-update');
          socket.off('lang-update');
          socket.off('font-size-update');
          socket.off('code-update');
          socket.off('input-update');
          socket.off('output-update');
        };
      }, []);

      const handleCodeChange = (newValue) => {
        setCode(newValue);
        socket.emit('code-update', { room, code: newValue });
      };
    
      const handleInputChange = (newValue) => {
        setInput(newValue);
        socket.emit('input-update', { room, input: newValue });
      };

    return (
        <div>
            <div className='flex gap-2'>
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
                    <div className="bg-zinc-700 p-1">
                        <div className="text-white font-mono font-semibold">
                        USER INPUT
                        </div>
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