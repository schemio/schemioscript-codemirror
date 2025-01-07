import {parser} from "./schemioscript.grammar"
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
        VariableName: t.variableName,
        true: t.bool,
        false: t.bool,
        null: t.null,
        String: t.string,
        TemplateString: t.special(t.string),
        "for while if else struct local": t.keyword,
        FuncName: t.function(t.variableName),
        Number: t.number,
        LineComment: t.lineComment,
        BlockComment: t.blockComment,
        "( )": t.paren
      })
    ]
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
  return new LanguageSupport(SchemioScriptLanguage, [SchemioScriptCompletion])
}
