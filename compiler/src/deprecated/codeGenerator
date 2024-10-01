export default function codeCreator(Node: ASTNode): string {

    switch (Node.type) {
        case "Program":
            return Node.body.map(codeCreator).join('\n');

        case 'CallExpression':
            return (
                codeCreator(Node.caller) +
                '(' +
                Node.params.map(codeCreator).join(', ') +
                ')'
            );

        case 'Identifier':
            return Node.name;

        case 'NumberLiteral':
            return Node.value;

        case 'StringLiteral':
            return '"' + Node.value + '"';

        default:
            throw new TypeError(Node.type);
    }
}