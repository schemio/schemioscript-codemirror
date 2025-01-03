import {parser} from "./schemioscript.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {completeFromList} from "@codemirror/autocomplete"

export const SchemioScriptLanguage = LRLanguage.define({
  parser: parser.configure({
  }),
  languageData: {
    commentTokens: {line: "//"}
  }
})

export const SchemioScriptCompletion = SchemioScriptLanguage.data.of({
  autocomplete: completeFromList([
    {label: "func", type: "keyword"},
    {label: "struct", type: "keyword"},
    {label: "local", type: "keyword"},
    {label: "for", type: "keyword"},
    {label: "while", type: "keyword"},
    {label: "if", type: "keyword"},
    {label: "else", type: "keyword"},
    {label: "abs", type: "function"},
    {label: "sin", type: "function"},
    {label: "cos", type: "function"},
  ])
})


export function SchemioScript() {
  return new LanguageSupport(SchemioScriptLanguage)
}
