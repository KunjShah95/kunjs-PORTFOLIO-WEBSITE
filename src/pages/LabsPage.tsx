import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';

const LABS = [
  {
    id: 'L01',
    title: 'Synthetic Memory',
    status: 'Stable',
    description: 'Architecture for recursive state persistence in non-deterministic agent clusters. Implements episodic memory buffers with decay-aware consolidation, semantic compression of long-running agent state, and checkpoint-based recovery for multi-step agent workflows.',
    stack: ['Redis', 'Vector DB', 'pgvector', 'LLM'],
  },
  {
    id: 'L02',
    title: 'Neural Protocol',
    status: 'Beta',
    description: 'Standardized handshake and task-routing protocol for multi-agent systems. Defines capability advertisement, task decomposition contracts, result aggregation strategies, and failure escalation across heterogeneous agent runtimes.',
    stack: ['gRPC', 'Protobuf', 'Python', 'asyncio'],
  },
  {
    id: 'L03',
    title: 'Context Window Optimizer',
    status: 'Experimental',
    description: 'A memory compression system that intelligently prioritizes relevant context for long-running agent sessions. Uses semantic chunking with recency-relevance scoring, sliding window eviction policies, and compressed knowledge summaries to keep context under budget without losing signal.',
    stack: ['llama.cpp', 'Semantic Chunking', 'Python', 'LLM'],
  },
  {
    id: 'L04',
    title: 'Building My Own Vector DB',
    status: 'Building',
    url: 'https://github.com/KunjShah01/BUILDING-MY-OWN-VECTOR-DB',
    description: 'A full-featured vector database from scratch. Implements 9 ANN algorithms (HNSW, IVF, PQ, Int8, LSH, KD-Tree, VP-Tree, BM25, Hybrid RRF), a cost-based query planner for hybrid metadata+vector search, Write-Ahead Log with fsync crash durability, background compaction, distributed scatter-gather aggregation across shards, and row-level RBAC. Includes multimodal ingestion (text via Sentence-Transformers, image via CLIP, audio via MFCC), a full RAG pipeline with cross-encoder re-ranking, OpenAI-compatible endpoints, gRPC/WebSocket/GraphQL APIs, GPU-accelerated indexing (CuPy k-means, SIMD distance kernels via Numba JIT + C++ PyBind11), Prometheus metrics with a Chart.js dashboard, self-tuning index parameters via AI, and multi-language SDKs (Python, TypeScript, Go, Rust, Java, .NET). Deployable via Docker Compose, Helm on Kubernetes, or Terraform to AWS/Azure.',
    stack: ['FastAPI', 'HNSW', 'PostgreSQL', 'CLIP', 'gRPC', 'Kubernetes', 'CuPy', 'PyTorch'],
  },
  {
    id: 'L05',
    title: 'Building My Own GPT-2',
    status: 'Building',
    url: 'https://github.com/KunjShah01/transformers',
    description: 'Reimplementing GPT-2 from first principles following the nanoGPT curriculum. Weeks 1-2 cover the foundations: character-level tokenization, bigram baselines, causal self-attention with masking, multi-head attention, feed-forward networks with ReLU, residual connections with layer normalization, and the complete transformer block. Weeks 3-4 build up to a full GPT-2 reproduction with byte-pair encoding, weight initialization, gradient accumulation, and training on the Tiny Shakespeare dataset. Built step-by-step so every component is understood before the next is stacked on top.',
    stack: ['PyTorch', 'Python', 'CUDA', 'Attention', 'BPE'],
  },
  {
    id: 'L06',
    title: 'Building My Own Neural Network',
    status: 'Building',
    url: 'https://github.com/KunjShah01/transformers',
    description: 'Neural networks built from scratch using only NumPy — no autograd, no deep learning frameworks. Implements forward/backward propagation manually, gradient descent with configurable learning rates, multiple activation functions (ReLU, sigmoid, tanh, softmax), cross-entropy and MSE loss, weight initialization strategies, mini-batch training loops, and evaluation on Tiny Shakespeare. The companion foundation to the GPT-2 reproduction, proving understanding from the weights up.',
    stack: ['NumPy', 'Python', 'Backprop', 'GD'],
  },
];

export function LabsPage() {
  return (
    <>
      <SEO
        title="Labs — Kunj Shah"
        description="Experiments, prototypes, and research by Kunj Shah — synthetic memory, neural protocols, context window optimization. Outside production work."
        url={`${SITE_URL}/labs`}
      />
      <PageHeader
        kicker="Labs"
        title="Experiments, prototypes, and abandoned ideas."
        lede="Things I'm tinkering with outside of production work. Most of these will never ship. That's the point."
        center
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LABS.map((l, i) => (
            <article key={i} className="bg-paper p-6 flex flex-col rounded-xl border border-rule/10 hover:border-accent/20 transition-colors">
              <Kicker>{l.status ?? 'Experiment'}</Kicker>
              <h3 className="display text-xl mt-3 leading-tight flex-1">
                {'url' in l && l.url ? (
                  <a href={l.url as string} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-ink-primary/40 underline-offset-4">
                    {l.title}
                  </a>
                ) : (
                  l.title
                )}
              </h3>
              <p className="mt-3 text-sm text-ink-secondary line-clamp-3">{l.description}</p>
              {l.stack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {l.stack.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-2 h-6 inline-flex items-center rounded-md bg-elevated border border-rule/10 text-xs font-mono text-ink-secondary">{s}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
