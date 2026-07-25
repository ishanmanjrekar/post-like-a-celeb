export interface TraceryGrammar {
  [key: string]: string[];
}

export function createGrammar(grammar: TraceryGrammar) {
  const getSymbol = (symbol: string): string => {
    const rules = grammar[symbol];
    if (!rules || rules.length === 0) {
      return `#${symbol}#`; // Fallback to show missing symbols
    }
    return rules[Math.floor(Math.random() * rules.length)];
  };

  const expand = (text: string, depth = 0): string => {
    // Prevent infinite loops on recursive rules
    if (depth > 30) return text;

    const regex = /#([^#]+)#/g;
    let hasToken = false;

    const result = text.replace(regex, (_, tokenExpression) => {
      hasToken = true;
      const parts = tokenExpression.split('.');
      const tokenName = parts[0];
      const modifier = parts[1];

      let replacement = getSymbol(tokenName);

      if (modifier) {
        replacement = applyModifier(replacement, modifier);
      }

      return replacement;
    });

    // Recursively expand tokens inside the replacement string
    if (hasToken) {
      return expand(result, depth + 1);
    }

    return result;
  };

  const applyModifier = (value: string, modifier: string): string => {
    switch (modifier) {
      case 'capitalize':
        return value.charAt(0).toUpperCase() + value.slice(1);
      
      case 'capitalizeAll':
        return value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      
      case 's': {
        const lower = value.toLowerCase();
        if (lower.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(lower.charAt(lower.length - 2))) {
          return value.slice(0, -1) + 'ies';
        }
        if (lower.endsWith('s') || lower.endsWith('z') || lower.endsWith('ch') || lower.endsWith('sh') || lower.endsWith('x')) {
          return value + 'es';
        }
        return value + 's';
      }

      case 'a': {
        const firstLetter = value.trim().charAt(0).toLowerCase();
        const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(firstLetter);
        return (isVowel ? 'an ' : 'a ') + value;
      }

      default:
        return value;
    }
  };

  return {
    flatten: (startSymbol = 'origin') => {
      return expand(`#${startSymbol}#`);
    },
  };
}
