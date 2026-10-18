/**
 * The one place client components get Motion from.
 *
 * `motion` is re-exported as the lazy `m` component. `m` takes its renderer
 * from the `LazyMotion` provider in `components/shell/motion-provider.tsx`
 * instead of importing the full animation engine, so the shipped bundle holds
 * only the feature bundle we load there.
 *
 * The alias is deliberate: call sites keep reading `motion.div`, which matches
 * the Motion docs, while the bundle stays small. If you add a Motion import to
 * a component, add it here rather than reaching for `framer-motion` directly -
 * that is what keeps the full engine out of the graph.
 */

export { m as motion } from "framer-motion";
export {
  AnimatePresence,
  LazyMotion,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
