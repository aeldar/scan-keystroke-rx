
import { fromEvent, Observable } from 'rxjs';
import { map, scan, first, filter, window as win, debounceTime, mergeAll } from 'rxjs/operators';

const doc: Node = window && window.document;

const typingsStreamFromNode = (node: Node): Observable<string> =>
  fromEvent(node, 'keypress').pipe(
    map((e: KeyboardEvent) => e.key),
  );

const findKeywordInStream = (stream$: Observable<string>, keyword: string, ci: boolean): Observable<string> => {
  const keyword0 = ci ? keyword.toLowerCase() : keyword;
  return stream$.pipe(
    scan((acc: string, curr: string) => acc + curr, ''),
    filter((line: string) => line.length === keyword0.length), // optimize calcs
    map((line: string) => ci ? line.toLowerCase() : line), // case insensitive
    filter((line: string) => line === keyword0),
    first(), // we only need one
  )
}

export const findKeyword = (keyword: string, node: Node = doc, ci: boolean = true, resetTime: number = 1000): Observable<string> => {
  const typings$: Observable<string> = typingsStreamFromNode(node);
  const reset$: Observable<null> = typings$.pipe(
    debounceTime(resetTime),
    map(_ => null),
  );
  return typings$.pipe(
    win(reset$),
    map(w$ => findKeywordInStream(w$, keyword, ci)),
    mergeAll(),
  );
}

export default findKeyword;
