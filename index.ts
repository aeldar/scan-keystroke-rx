import { fromEvent, Observable } from 'rxjs';
import { map, scan, take, filter, window as win, debounceTime, mergeAll } from 'rxjs/operators';

const doc: Node = window && window.document;

const typingsStreamFromNode = (node: Node): Observable<string> =>
  fromEvent(node, 'keypress').pipe(
    map((e: KeyboardEvent) => e.key),
  );

const findPhraseInStream = (stream$: Observable<string>, phrase: string, ci: boolean): Observable<string> => {
  const phrase0 = ci ? phrase.toLowerCase() : phrase;
  return stream$.pipe(
    scan((acc: string, curr: string) => acc + curr, ''),
    filter((line: string) => line.length === phrase0.length), // optimize calcs
    map((line: string) => ci ? line.toLowerCase() : line), // case insensitive
    filter((line: string) => line === phrase0),
    take(1), // we only need one
  )
}

export const findPhrase = (phrase: string, node: Node = doc, ci: boolean = true, resetTime: number = 1000): Observable<string> => {
  const typings$: Observable<string> = typingsStreamFromNode(node);
  const reset$: Observable<null> = typings$.pipe(
    debounceTime(resetTime),
    map(_ => null),
  );
  return typings$.pipe(
    win(reset$),
    map((w$: Observable<string>) => findPhraseInStream(w$, phrase, ci)),
    mergeAll(),
  );
}

export default findPhrase;
