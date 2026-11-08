import { useState, type ReactNode, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { useGeneratePrd } from '@workspace/api-client-react';
import { ArrowDownToLine, ArrowRight, Check, Clipboard, FileText, Layers3, Lightbulb, LoaderCircle, RotateCcw, Sparkles, TriangleAlert } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [idea, setIdea] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [copied, setCopied] = useState(false);
  const generatePrd = useGeneratePrd();
  const result = generatePrd.data;
  const isPending = generatePrd.isPending;
  const ideaIsValid = idea.trim().length >= 3 && idea.trim().length <= 280;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ideaIsValid || isPending) return;
    generatePrd.mutate({
      data: {
        idea: idea.trim(),
        ...(targetUser.trim() ? { targetUser: targetUser.trim() } : {}),
      },
    });
  }

  function startOver() {
    setIdea('');
    setTargetUser('');
    generatePrd.reset();
    setCopied(false);
  }

  async function copyRevised() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.revised);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function downloadRevised() {
    if (!result) return;
  const markdown = `${result.revised.trim()}\n`;
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revised-prd.md';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const errorMessage = generatePrd.error
    ? ('error' in generatePrd.error && typeof generatePrd.error.error === 'string'
      ? generatePrd.error.error
      : 'We couldn’t generate the PRD just now. Please try again.')
    : '';

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="brand-mark" aria-hidden="true"><Layers3 size={18} strokeWidth={2.1} /></div>
            <div>
              <p className="text-[14px] font-bold tracking-[-.025em]">Fieldnotes <span className="font-medium text-muted-foreground">/ PRD generator</span></p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="eyebrow text-[9px] text-muted-foreground">Product thinking, in passes</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-9 sm:px-8 sm:pt-12">
        <section className="mb-9 max-w-[760px]">
          <p className="eyebrow mb-3 text-[10px] text-primary">A clearer path from idea to plan</p>
          <h1 className="hero-title text-[42px] font-extrabold leading-[1.04] text-foreground sm:text-[58px]">
            Good ideas deserve<br className="hidden sm:block" /> a sharper first draft.
          </h1>
          <p className="mt-4 max-w-[570px] text-[15px] leading-7 text-muted-foreground sm:text-[16px]">
            Start with one feature idea. Get a draft, a constructive challenge, and a revised PRD you can take into the room.
          </p>
        </section>

        <div className="workspace-grid">
          <section className="surface rounded-[18px] p-5 sm:p-6" aria-labelledby="idea-form-title">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow text-[9px] text-muted-foreground">01 / Starting point</p>
                <h2 id="idea-form-title" className="mt-2 text-[19px] font-bold tracking-[-.03em]">What are you thinking?</h2>
              </div>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Lightbulb size={17} /></div>
            </div>
            <form onSubmit={submit} noValidate>
              <label htmlFor="feature-idea" className="mb-2 block text-[12px] font-semibold text-foreground">
                Feature idea <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="feature-idea"
                data-testid="input-feature-idea"
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                maxLength={280}
                required
                aria-describedby="idea-hint idea-count"
                placeholder="A calendar that finds the best time for the whole team…"
                className="h-[68px] w-full rounded-xl border border-input bg-background px-3.5 text-[14px] text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none"
              />
              <div className="mt-2 flex items-center justify-between gap-3">
                <p id="idea-hint" className="text-[11px] leading-5 text-muted-foreground">A sentence is plenty. Be specific if you can.</p>
                <span id="idea-count" className={`shrink-0 font-mono text-[10px] ${idea.length > 260 ? 'text-destructive' : 'text-muted-foreground'}`}>{idea.length}/280</span>
              </div>

              <label htmlFor="target-user" className="mb-2 mt-5 block text-[12px] font-semibold text-foreground">
                Who is it for? <span className="font-normal text-muted-foreground">Optional</span>
              </label>
              <input
                id="target-user"
                data-testid="input-target-user"
                value={targetUser}
                onChange={(event) => setTargetUser(event.target.value)}
                maxLength={160}
                aria-describedby="user-hint"
                placeholder="e.g. Project leads at growing teams"
                className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none"
              />
              <p id="user-hint" className="mt-2 text-[11px] leading-5 text-muted-foreground">A little context helps make the requirements more useful.</p>

              {generatePrd.isError && (
                <div className="mt-4 flex gap-2.5 rounded-xl border border-destructive/25 bg-destructive/5 px-3.5 py-3" role="alert" data-testid="status-generation-error">
                  <TriangleAlert className="mt-0.5 shrink-0 text-destructive" size={16} />
                  <div>
                    <p className="text-[12px] font-semibold text-destructive">Generation didn’t finish</p>
                    <p className="mt-1 text-[12px] leading-5 text-foreground/75">{errorMessage}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                data-testid="button-generate-prd"
                disabled={!ideaIsValid || isPending}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {isPending ? <><LoaderCircle size={16} className="animate-spin" /> Working through the idea…</> : <>Generate my PRD <ArrowRight size={16} /></>}
              </button>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">Your idea becomes a starting point, not a final answer.</p>
            </form>
          </section>

          <section className="min-w-0" aria-labelledby="results-title" aria-live="polite">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-[9px] text-muted-foreground">02 / The working document</p>
                <h2 id="results-title" className="mt-1.5 text-[21px] font-bold tracking-[-.035em]">Three passes. One stronger plan.</h2>
              </div>
              {result && !isPending && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.08em] ${result.mode === 'live' ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'}`} data-testid="status-generation-mode">
                    {result.mode === 'live' ? 'Live generation' : 'Demo mode'}
                  </span>
                  <button onClick={copyRevised} type="button" data-testid="button-copy-revised" className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[11px] font-semibold text-foreground transition-colors hover:bg-muted">
                    {copied ? <Check size={14} /> : <Clipboard size={14} />}{copied ? 'Copied' : 'Copy revised'}
                  </button>
                  <button onClick={downloadRevised} type="button" data-testid="button-download-revised" className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-[11px] font-semibold text-background transition-opacity hover:opacity-85">
                    <ArrowDownToLine size={14} /> Download .md
                  </button>
                </div>
              )}
            </div>

            {isPending ? (
              <div className="result-grid" data-testid="status-generation-loading">
                {['draft', 'critique'].map((name) => <div key={name} className="surface result-card rounded-[16px] p-5"><div className="loading-shimmer h-3 w-20 rounded" /><div className="loading-shimmer mt-5 h-3 w-full rounded" /><div className="loading-shimmer mt-3 h-3 w-[86%] rounded" /><div className="loading-shimmer mt-3 h-3 w-[68%] rounded" /><div className="loading-shimmer mt-8 h-3 w-[92%] rounded" /><div className="loading-shimmer mt-3 h-3 w-[74%] rounded" /></div>)}
                <div className="surface result-card revised-card rounded-[16px] p-5"><div className="loading-shimmer h-3 w-28 rounded" /><div className="loading-shimmer mt-6 h-3 w-full rounded" /><div className="loading-shimmer mt-3 h-3 w-[93%] rounded" /><div className="loading-shimmer mt-3 h-3 w-[81%] rounded" /><div className="loading-shimmer mt-8 h-3 w-[87%] rounded" /></div>
              </div>
            ) : result ? (
              <div className="result-grid enter" data-testid="content-prd-results">
                <ResultCard number="A" title="Draft" note="The first shape" content={result.draft} />
                <ResultCard number="B" title="Revised PRD" note="A more decision-ready version" content={result.revised} revised />
                <ResultCard number="C" title="Critique" note="What needs a closer look" content={result.critique} critique />
              </div>
            ) : (
              <div className="surface relative min-h-[490px] overflow-hidden rounded-[18px] p-6 sm:p-8" data-testid="empty-prd-results">
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-primary/10" />
                <div className="pointer-events-none absolute -right-5 -top-5 h-44 w-44 rounded-full border border-primary/10" />
                <div className="relative flex min-h-[430px] flex-col justify-between">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Sparkles size={18} /></div>
                      <div><p className="text-[13px] font-semibold">A useful first pass starts here</p><p className="mt-1 text-[11px] text-muted-foreground">Not a blank page for long.</p></div>
                    </div>
                    <p className="max-w-[520px] text-[24px] font-semibold leading-[1.35] tracking-[-.04em] text-foreground sm:text-[31px]">
                      One idea in.<br /><span className="text-primary">A clearer conversation out.</span>
                    </p>
                    <p className="mt-4 max-w-[460px] text-[13px] leading-6 text-muted-foreground">
                      We’ll lay out the opportunity, look for the gaps worth challenging, then bring it together in a revised product brief.
                    </p>
                  </div>
                  <div className="mt-9 grid max-w-[650px] grid-cols-1 gap-3 sm:grid-cols-3">
                    <EmptyStep number="01" title="Draft" text="Give the idea a useful shape." />
                    <EmptyStep number="02" title="Critique" text="Surface assumptions and risks." />
                    <EmptyStep number="03" title="Revise" text="Make the next step clearer." />
                  </div>
                  <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-[10px] text-muted-foreground">
                    <FileText size={13} /><span>Enter a feature idea to see all three passes side by side.</span>
                  </div>
                </div>
              </div>
            )}
            {result && !isPending && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-card/55 px-4 py-3 enter">
                <p className="text-[11px] leading-5 text-muted-foreground">Treat this as a working document. Validate the assumptions with your team and users.</p>
                <button onClick={startOver} type="button" data-testid="button-start-over" className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline">
                  <RotateCcw size={13} /> Start a new idea
                </button>
              </div>
            )}
          </section>
        </div>
        <footer className="mt-12 flex flex-col justify-between gap-2 border-t border-border/80 pt-4 text-[10px] text-muted-foreground sm:flex-row">
          <span>Fieldnotes / Product planning workspace</span>
          <span>Clarity before commitment.</span>
        </footer>
      </main>
    </div>
  );
}

function ResultCard({ number, title, note, content, critique = false, revised = false }: { number: string; title: string; note: string; content: string; critique?: boolean; revised?: boolean }) {
  return (
    <article className={`surface result-card ${critique ? 'critique-card' : revised ? 'revised-card' : 'draft-card'} rounded-[16px] p-5 sm:p-6`} data-testid={`card-prd-${title.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-start gap-3">
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[10px] font-medium ${revised ? 'bg-primary text-primary-foreground' : critique ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>{number}</span>
          <div><h3 className="text-[14px] font-bold tracking-[-.02em]">{title}</h3><p className="mt-1 text-[10px] text-muted-foreground">{note}</p></div>
        </div>
        {revised && <span className="rounded-full bg-primary/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[.08em] text-primary">Ready to review</span>}
      </div>
      <MarkdownContent
        content={content}
        className={`text-document text-[12px] leading-[1.8] text-foreground/85 sm:text-[13px] ${critique ? 'border-l-2 border-accent pl-4' : ''}`}
        testId={`text-prd-${title.toLowerCase().replaceAll(' ', '-')}`}
      />
    </article>
  );
}

function renderInlineMarkdown(line: string): ReactNode[] {
  const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-muted px-1 py-0.5 font-mono text-[.9em]">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function MarkdownContent({ content, className, testId }: { content: string; className: string; testId: string }) {
  const blocks: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    const List = listType;
    blocks.push(
      <List key={`list-${listKey++}`} className="my-2 space-y-1.5 pl-5 marker:text-primary">
        {listItems.map((item, index) => <li key={index} className="pl-1">{renderInlineMarkdown(item)}</li>)}
      </List>,
    );
    listType = null;
    listItems = [];
  };

  for (const [index, rawLine] of content.split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const nextType = unordered ? "ul" : "ol";
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered ?? ordered)![1]);
      continue;
    }

    flushList();
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const headingClass = heading[1].length === 1
        ? "mb-2 mt-4 text-[15px] font-bold tracking-[-.02em] text-foreground first:mt-0"
        : "mb-2 mt-4 text-[12px] font-bold tracking-[-.01em] text-foreground first:mt-0";
      const children = renderInlineMarkdown(heading[2]);
      if (heading[1].length === 1) {
        blocks.push(<h3 key={`heading-${index}`} className={headingClass}>{children}</h3>);
      } else {
        blocks.push(<h4 key={`heading-${index}`} className={headingClass}>{children}</h4>);
      }
    } else {
      blocks.push(<p key={`paragraph-${index}`} className="my-2 first:mt-0 last:mb-0">{renderInlineMarkdown(line)}</p>);
    }
  }
  flushList();

  return <div className={className} data-testid={testId}>{blocks}</div>;
}

function EmptyStep({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="rounded-xl border border-border/80 bg-background/65 p-3.5">
    <div className="flex items-center gap-2"><span className="font-mono text-[9px] text-primary">{number}</span><span className="text-[11px] font-bold">{title}</span></div>
    <p className="mt-2 text-[10px] leading-4 text-muted-foreground">{text}</p>
  </div>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
