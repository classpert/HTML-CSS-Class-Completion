import * as css from "css";
import CssClassDefinition from "../../common/css-class-definition";
// import channel from "../../channel";

export default class CssClassExtractor {
  /**
   * @description Extracts class names from CSS AST
   */
  public static extract(ast: css.Stylesheet): CssClassDefinition[] {
    const classNameRegex: RegExp = /\.((?:(?:[A-z\d%-])|\:|\(|\)|\@|\>|\<)+)/g;

    const definitions: CssClassDefinition[] = [];

    // go through each of the rules...
    ast.stylesheet.rules.forEach((rule: css.Rule) => {
      // channel.appendLine("processing rule " + rule);
      // ...of type rule
      if (rule.type === "rule") {
        // go through each of the selectors of the current rule
        rule.selectors.forEach((selector: string) => {
          let item: RegExpExecArray = classNameRegex.exec(selector);
          while (item) {
            let normalizedItem: string = item[1].replace(
              /(\\([:@<>\)\(]))/g,
              "$2"
            );
            definitions.push(new CssClassDefinition(normalizedItem));
            item = classNameRegex.exec(selector);
          }
        });
      }
    });

    return definitions;
  }
}
