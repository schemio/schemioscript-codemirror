import {parser} from "./schemioscript.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent, continuedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {completeFromList} from "@codemirror/autocomplete"

export const SchemioScriptLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        IfStatement: continuedIndent({except: /^\s*({|else\b)/}),
        Block: delimitedIndent({closing: "}"}),
        ArrowFunction: cx => cx.baseIndent + cx.unit,
        "TemplateString BlockComment": () => null,
      }),
      foldNodeProp.add({
        Block: foldInside
      }),
      styleTags({
        VariableName: t.variableName,
        true: t.bool,
        false: t.bool,
        null: t.null,
        String: t.string,
        TemplateString: t.special(t.string),
        "for while if else struct local let func this": t.keyword,
        FuncName: t.function(t.strong),
        FuncArgName: t.attributeName,
        Number: t.number,
        CallExpression: t.constant(t.variableName),
        LineComment: t.lineComment,
        BlockComment: t.blockComment,
        ExternalObjectReference: t.macroName,
        StructPropertyName: t.propertyName,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
  }
})

const functions = `
  acos
  asin
  atan
  ceil
  cos
  debugItem
  duplicate
  findChildItemByName
  findChildItemsByTag
  findItemById
  findItemByName
  findParent
  floor
  getAngle
  getEventArg
  getEventName
  getHeight
  getId
  getName
  getOpacity
  getPos
  getPosX
  getPosY
  getScaleX
  getScaleY
  getSelfOpacity
  getShape
  getTags
  getValue
  getVar
  getWidth
  getWorldPos
  hide
  ifcond
  isVisible
  List
  localPoint
  log
  log10
  log2
  logn
  Map
  matchWorld
  min
  mount
  mountChild
  mountRoot
  parseFloat
  parseInt
  PI
  pow
  remove
  removeChildItemsByTag
  rgba
  rnd
  round
  sendEvent
  setAngle
  setHeight
  setOpacity
  setPos
  setPosX
  setPosY
  setScaleX
  setScaleY
  setSelfOpacity
  setText
  setTextColor
  setTextSize
  setValue
  setVar
  setWidth
  setWorldPos
  show
  sin
  sqrt
  tag
  tan
  uid
  worldPoint
`;

export const SchemioScriptCompletion = SchemioScriptLanguage.data.of({
  autocomplete: completeFromList([
    {label: "func", type: "keyword"},
    {label: "struct", type: "keyword"},
    {label: "local", type: "keyword"},
    {label: "let", type: "keyword"},
    {label: "for", type: "keyword"},
    {label: "while", type: "keyword"},
    {label: "if", type: "keyword"},
    {label: "else", type: "keyword"},
  ].concat(functions.split(/\s+/).filter(name => name).map(name => {return {
    label: name, type: 'function'
  }})))
})


export function SchemioScript() {
  return new LanguageSupport(SchemioScriptLanguage, [SchemioScriptCompletion])
}
