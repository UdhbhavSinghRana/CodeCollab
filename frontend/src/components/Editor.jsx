import React, { useState } from 'react';
import AceEditor from "react-ace";
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

function onChange(newValue) {
    console.log("change", newValue);
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
            <div className='w-1/2'>
                <AceEditor className='border-2'
                    mode="java"
                    theme={theme}
                    fontSize={fontSize}
                    onChange={onChange}
                    width='100%'
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
            </div>
    </div>
  )
}

export default Editor