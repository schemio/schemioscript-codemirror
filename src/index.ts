import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {completeFromList} from "@codemirror/autocomplete"

export const SchemioScriptLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "{ }": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
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
