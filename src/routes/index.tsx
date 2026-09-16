import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Карина ❤️ Конструктор нашего свидания" },
      {
        name: "description",
        content:
          "Личное приглашение: выбери любую дату, время, место и настроение — сайт соберёт план вечера, билет DATE PASS и таймер до встречи.",
      },
      { property: "og:title", content: "Карина ❤️ Приглашение на свидание" },
      {
        property: "og:description",
        content: "Некоторые вещи лучше не читать заранее… Открой письмо.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvitationPage,
});

/* ---------------- background layers ---------------- */

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        left: (i * 37.7) % 100,
        top: (i * 23.3) % 62,
        size: 1.5 + ((i * 7) % 3),
        dur: 3 + ((i * 13) % 40) / 10,
        delay: ((i * 29) % 50) / 10,
      })),
    []
  );
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 71) % 96,
        size: 10 + ((i * 11) % 10),
        dur: 13 + ((i * 17) % 12),
        delay: -((i * 31) % 22),
        sway: ((i % 2 ? 1 : -1) * (4 + ((i * 7) % 8))).toFixed(0),
      })),
    []
  );
  return (
    <>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.25,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--sway": `${p.sway}vw`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function GlowHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        left: 8 + ((i * 53) % 84),
        top: 40 + ((i * 29) % 50),
        size: 14 + ((i * 9) % 14),
        dur: 8 + ((i * 13) % 6),
        delay: -((i * 19) % 12),
      })),
    []
  );
  return (
    <>
      {hearts.map((h, i) => (
        <span
          key={i}
          className="glow-heart"
          style={
            {
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: h.size,
              "--dur": `${h.dur}s`,
              "--delay": `${h.delay}s`,
            } as React.CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </>
  );
}

function NightSky({ children }: { children: React.ReactNode }) {
  return (
    <div className="sky relative min-h-screen w-full overflow-hidden">
      <Stars />
      <Petals />
      <GlowHearts />
      <div className="moon absolute right-[8%] top-[7%] size-28 rounded-full sm:size-40" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ---------------- data ---------------- */

const PLACES = [
  { id: "cafe", emoji: "☕", name: "Кафе", note: "спокойный разговор и что-нибудь вкусное" },
  { id: "walk", emoji: "🌙", name: "Прогулка", note: "вечерний город и разговоры обо всём" },
  { id: "cinema", emoji: "🎬", name: "Кино", note: "фильм и обсуждение после" },
  { id: "restaurant", emoji: "🌹", name: "Ресторан", note: "красивый вечер при свечах" },
  { id: "park", emoji: "🌳", name: "Парк", note: "просто спокойно побыть вдвоём" },
  { id: "surprise", emoji: "🎁", name: "Сюрприз", note: "место узнаешь позже" },
];

const MOODS = [
  { id: "romance", emoji: "❤️", name: "Романтика" },
  { id: "fun", emoji: "😂", name: "Веселье" },
  { id: "calm", emoji: "🌙", name: "Спокойствие" },
  { id: "adventure", emoji: "🔥", name: "Приключение" },
  { id: "unusual", emoji: "✨", name: "Что-нибудь необычное" },
  { id: "secret", emoji: "🎁", name: "Полный сюрприз" },
];

const DURATIONS = [
  { hours: 1, label: "1 час" },
  { hours: 2, label: "2 часа" },
  { hours: 3, label: "3 часа" },
  { hours: 4, label: "4 часа" },
  { hours: 6, label: "Пока не надоест ❤️" },
];

const WEEKDAYS = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const WD_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
const MONTHS_NOM = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

type Plan = {
  date: string; // YYYY-MM-DD
  hour: number;
  minute: number;
  duration: number;
  place: string;
  moods: string[];
  wish: string;
  ticket: string;
  created: string;
};

const keyOf = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const pad = (n: number) => String(n).padStart(2, "0");

function parsePlanDate(p: Plan) {
  const parts = p.date.split("-").map(Number);
  return new Date(parts[0]!, (parts[1] ?? 1) - 1, parts[2] ?? 1, p.hour, p.minute, 0, 0);
}

/* ---------------- page ---------------- */

type Step =
  | "intro"
  | "letter"
  | "date"
  | "time"
  | "duration"
  | "place"
  | "mood"
  | "plan"
  | "wish"
  | "ticket";

function InvitationPage() {
  const [step, setStep] = useState<Step>("intro");
  const [date, setDate] = useState<string | null>(null);
  const [hour, setHour] = useState(19);
  const [minute, setMinute] = useState(30);
  const [duration, setDuration] = useState(3);
  const [place, setPlace] = useState("cafe");
  const [moods, setMoods] = useState<string[]>(["romance"]);
  const [wish, setWish] = useState("");
  const [ticket, setTicket] = useState("826491");
  const [created, setCreated] = useState("");

  useEffect(() => {
    setTicket(String(100000 + Math.floor(Math.random() * 900000)));
    const now = new Date();
    setCreated(
      `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}, ${pad(
        now.getHours()
      )}:${pad(now.getMinutes())}`
    );
  }, []);

  const plan: Plan | null = date
    ? { date, hour, minute, duration, place, moods, wish, ticket, created }
    : null;

  return (
    <NightSky>
      <SecretHeart />
      {step === "intro" && <Intro onNext={() => setStep("letter")} />}
      {step === "letter" && <Letter onNext={() => setStep("date")} />}
      {step === "date" && (
        <DateStep value={date} onChange={setDate} onNext={() => setStep("time")} />
      )}
      {step === "time" && (
        <TimeStep
          hour={hour}
          minute={minute}
          setHour={setHour}
          setMinute={setMinute}
          onNext={() => setStep("duration")}
          onBack={() => setStep("date")}
        />
      )}
      {step === "duration" && (
        <DurationStep
          value={duration}
          onChange={setDuration}
          onNext={() => setStep("place")}
          onBack={() => setStep("time")}
        />
      )}
      {step === "place" && (
        <PlaceStep
          value={place}
          onChange={setPlace}
          onNext={() => setStep("mood")}
          onBack={() => setStep("duration")}
        />
      )}
      {step === "mood" && (
        <MoodStep
          value={moods}
          onChange={setMoods}
          onNext={() => setStep("plan")}
          onBack={() => setStep("place")}
        />
      )}
      {step === "plan" && plan && (
        <PlanStep plan={plan} onNext={() => setStep("wish")} onBack={() => setStep("mood")} />
      )}
      {step === "wish" && (
        <WishStep
          value={wish}
          onChange={setWish}
          onNext={() => setStep("ticket")}
          onBack={() => setStep("plan")}
        />
      )}
      {step === "ticket" && plan && (
        <TicketStep plan={plan} onEdit={() => setStep("date")} />
      )}
    </NightSky>
  );
}

/* ---------------- shared ui ---------------- */

function Shell({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      <header className="fade-up text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{kicker}</p>
        <h1 className="mt-5 font-display text-4xl font-semibold italic leading-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 font-display text-xl italic text-muted-foreground">{subtitle}</p>
        )}
      </header>
      <div className="fade-up mt-10" style={{ "--delay": "0.15s" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  nextLabel = "Дальше →",
  disabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      {onBack && (
        <button
          onClick={onBack}
          className="rounded-full border border-border px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50"
        >
          ← Назад
        </button>
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className="btn-yes rounded-full bg-primary px-9 py-3.5 text-base font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] disabled:opacity-40"
      >
        {nextLabel}
      </button>
    </div>
  );
}

/* ---------------- 1. intro ---------------- */

function Intro({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p
        className="fade-up text-xs uppercase tracking-[0.35em] text-muted-foreground"
        style={{ "--delay": "0.1s" } as React.CSSProperties}
      >
        личное послание
      </p>
      <h1
        className="fade-up mt-6 font-display text-5xl font-semibold italic sm:text-7xl"
        style={{ "--delay": "0.3s" } as React.CSSProperties}
      >
        Карина <span className="not-italic text-rose">❤️</span>
      </h1>
      <p
        className="fade-up mt-5 max-w-lg font-display text-2xl italic text-muted-foreground text-balance sm:text-3xl"
        style={{ "--delay": "0.55s" } as React.CSSProperties}
      >
        Тебе пришло одно очень важное приглашение…
      </p>
      <button
        onClick={onNext}
        className="btn-yes fade-up mt-12 rounded-full bg-primary px-9 py-4 text-base font-medium tracking-wide text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
        style={{ "--delay": "0.8s" } as React.CSSProperties}
      >
        Открыть письмо →
      </button>
      <p
        className="fade-up absolute bottom-8 left-0 right-0 text-xs text-muted-foreground/70"
        style={{ "--delay": "1.1s" } as React.CSSProperties}
      >
        Некоторые вещи лучше не читать заранее…
      </p>
    </div>
  );
}

/* ---------------- 2. letter ---------------- */

function Letter({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="fade-up w-full max-w-xl rounded-3xl border border-primary/30 bg-card/80 p-10 text-center shadow-[0_0_80px_-20px] shadow-primary/40 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">письмо</p>
        <p className="mt-6 font-display text-2xl italic leading-relaxed text-balance">
          Я решил не просто написать тебе «пойдём на свидание?», а дать тебе возможность самой
          выбрать, каким будет этот вечер.
        </p>
        <p className="mt-6 text-muted-foreground">
          Дата, время, место, настроение — всё решаешь ты. А я всё организую.
        </p>
        <button
          onClick={onNext}
          className="btn-yes mt-10 rounded-full bg-primary px-9 py-3.5 font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Начать выбирать →
        </button>
      </div>
    </div>
  );
}

/* ---------------- 3. date ---------------- */

function DateStep({
  value,
  onChange,
  onNext,
}: {
  value: string | null;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const arr: (Date | null)[] = Array.from({ length: offset }, () => null);
    for (let i = 1; i <= days; i++) arr.push(new Date(view.getFullYear(), view.getMonth(), i));
    return arr;
  }, [view]);

  const selected = value
    ? (() => {
        const p = value.split("-").map(Number);
        return new Date(p[0]!, (p[1] ?? 1) - 1, p[2] ?? 1);
      })()
    : null;

  const canPrev =
    view.getFullYear() > today.getFullYear() ||
    (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth());

  return (
    <Shell
      kicker="шаг 1"
      title="Какой день будет нашим?"
      subtitle="Любой день, начиная с сегодняшнего."
    >
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            disabled={!canPrev}
            className="size-9 rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 disabled:opacity-25"
          >
            ‹
          </button>
          <p className="font-display text-2xl">
            {MONTHS_NOM[view.getMonth()]} {view.getFullYear()}
          </p>
          <button
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
            className="size-9 rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50"
          >
            ›
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
          {WD_SHORT.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`e${i}`} />;
            const past = d < today;
            const isSel = !!selected && keyOf(d) === keyOf(selected);
            return (
              <button
                key={keyOf(d)}
                disabled={past}
                onClick={() => onChange(keyOf(d))}
                className={`aspect-square rounded-xl text-sm transition-all duration-200 ${
                  isSel
                    ? "bg-primary font-semibold text-primary-foreground shadow-[0_0_24px_-4px] shadow-primary/60"
                    : past
                      ? "text-muted-foreground/25"
                      : "text-foreground hover:bg-secondary"
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center font-display text-2xl italic text-primary">
        {selected
          ? `${WEEKDAYS[selected.getDay()]}, ${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}`
          : "Выбери день ♥"}
      </p>

      <Nav onNext={onNext} disabled={!value} />
    </Shell>
  );
}

/* ---------------- 4. time ---------------- */

function TimeStep({
  hour,
  minute,
  setHour,
  setMinute,
  onNext,
  onBack,
}: {
  hour: number;
  minute: number;
  setHour: (h: number) => void;
  setMinute: (m: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const marks = Array.from({ length: 12 }, (_, i) => i + 1);
  const isPm = hour >= 12;
  const displayHour12 = hour % 12 === 0 ? 12 : hour % 12;

  const presets = [
    { label: "🌅 Ранний вечер", h: 17, m: 0 },
    { label: "🌆 Вечер", h: 19, m: 30 },
    { label: "🌙 Поздний вечер", h: 21, m: 30 },
  ];

  return (
    <Shell kicker="шаг 2" title="Во сколько начинается наше приключение?">
      <div className="mx-auto grid max-w-2xl gap-10 sm:grid-cols-[auto_1fr] sm:items-center">
        {/* clock */}
        <div className="relative mx-auto size-64 rounded-full border border-primary/25 bg-card/60 backdrop-blur">
          {marks.map((m) => {
            const angle = (m / 12) * Math.PI * 2 - Math.PI / 2;
            const r = 108;
            const active = displayHour12 === m;
            return (
              <button
                key={m}
                onClick={() => setHour(isPm ? (m % 12) + 12 : m % 12)}
                className={`absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm transition-all ${
                  active
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  left: `calc(50% + ${Math.cos(angle) * r}px)`,
                  top: `calc(50% + ${Math.sin(angle) * r}px)`,
                }}
              >
                {m}
              </button>
            );
          })}
          <div className="absolute inset-0 grid place-items-center">
            <p className="font-display text-4xl font-semibold text-primary">
              {pad(hour)}:{pad(minute)}
            </p>
          </div>
        </div>

        {/* controls */}
        <div className="space-y-5">
          <div className="flex gap-2">
            <button
              onClick={() => setHour(hour % 12)}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                !isPm ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              ДО ОБЕДА
            </button>
            <button
              onClick={() => setHour((hour % 12) + 12)}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                isPm ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              ПОСЛЕ ОБЕДА
            </button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">минуты</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[0, 15, 30, 45].map((m) => (
                <button
                  key={m}
                  onClick={() => setMinute(m)}
                  className={`rounded-full border px-5 py-2 text-sm transition-all ${
                    minute === m
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  :{pad(m)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">или просто</p>
            <div className="mt-3 flex flex-col gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setHour(p.h);
                    setMinute(p.m);
                  }}
                  className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                    hour === p.h && minute === p.m
                      ? "border-primary bg-card"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

/* ---------------- 5. duration ---------------- */

function DurationStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Shell kicker="шаг 3" title="Сколько времени украдём у этого дня?">
      <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-3">
        {DURATIONS.map((d) => (
          <button
            key={d.hours}
            onClick={() => onChange(d.hours)}
            className={`rounded-2xl border px-6 py-4 font-display text-xl transition-all ${
              value === d.hours
                ? "border-primary bg-card shadow-[0_0_28px_-6px] shadow-primary/40"
                : "border-border bg-card/40 hover:border-primary/50"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

/* ---------------- 6. place ---------------- */

function PlaceStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Shell kicker="шаг 4" title="Куда пойдём?">
      <div className="grid gap-3 sm:grid-cols-2">
        {PLACES.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
              value === p.id
                ? "border-primary bg-card shadow-[0_0_28px_-6px] shadow-primary/40"
                : "border-border bg-card/50 hover:border-primary/50"
            }`}
          >
            <span className="text-2xl">{p.emoji}</span>
            <p className="mt-2 font-display text-2xl font-medium">{p.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
          </button>
        ))}
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

/* ---------------- 7. mood ---------------- */

function MoodStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  return (
    <Shell
      kicker="шаг 5"
      title="Какое настроение у этого вечера?"
      subtitle="Можно выбрать несколько."
    >
      <div className="flex flex-wrap justify-center gap-3">
        {MOODS.map((m) => (
          <button
            key={m.id}
            onClick={() => toggle(m.id)}
            className={`rounded-full border px-6 py-3 text-base transition-all ${
              value.includes(m.id)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/40 hover:border-primary/50"
            }`}
          >
            {m.emoji} {m.name}
          </button>
        ))}
      </div>
      <Nav onBack={onBack} onNext={onNext} disabled={value.length === 0} />
    </Shell>
  );
}

/* ---------------- 8. plan ---------------- */

function buildPlan(plan: Plan) {
  const start = parsePlanDate(plan);
  const place = PLACES.find((p) => p.id === plan.place) ?? PLACES[0]!;
  const items: { time: Date; text: string }[] = [];
  const at = (mins: number) => new Date(start.getTime() + mins * 60000);
  items.push({ time: at(0), text: "📍 Встреча" });
  items.push({ time: at(30), text: `${place.emoji} ${place.name}` });
  if (plan.duration >= 2) items.push({ time: at(30 + 90), text: "🌙 Прогулка" });
  if (plan.duration >= 3) items.push({ time: at(plan.duration * 60 - 30), text: "❤️ Время только для нас" });
  items.push({ time: at(plan.duration * 60), text: "✨ Провожаю тебя домой" });
  return items;
}

function PlanStep({
  plan,
  onNext,
  onBack,
}: {
  plan: Plan;
  onNext: () => void;
  onBack: () => void;
}) {
  const items = buildPlan(plan);
  return (
    <Shell kicker="шаг 6" title="Вот каким будет наш вечер">
      <ol className="mx-auto max-w-md space-y-3">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-5 rounded-2xl border border-border bg-card/60 px-5 py-4 backdrop-blur"
          >
            <span className="font-display text-2xl text-primary">
              {pad(it.time.getHours())}:{pad(it.time.getMinutes())}
            </span>
            <span className="text-lg">{it.text}</span>
          </li>
        ))}
      </ol>
      <Nav onBack={onBack} onNext={onNext} />
    </Shell>
  );
}

/* ---------------- 9. wish ---------------- */

function WishStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Shell kicker="шаг 7" title="Есть особое желание на этот вечер?">
      <div className="mx-auto max-w-md">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="Например: хочу мороженое ❤️"
          className="w-full resize-none rounded-2xl border border-border bg-card/60 p-5 text-base outline-none backdrop-blur transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
      </div>
      <Nav onBack={onBack} onNext={onNext} nextLabel="Создать билет ♥" />
    </Shell>
  );
}

/* ---------------- 10-13. ticket ---------------- */

function TicketStep({ plan, onEdit }: { plan: Plan; onEdit: () => void }) {
  const start = parsePlanDate(plan);
  const end = new Date(start.getTime() + plan.duration * 3600000);
  const place = PLACES.find((p) => p.id === plan.place) ?? PLACES[0]!;
  const moods = MOODS.filter((m) => plan.moods.includes(m.id));
  const [now, setNow] = useState(() => new Date());
  const [tab, setTab] = useState<"ticket" | "timer" | "invite" | "after">("ticket");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const completed = now >= end;
  const started = now >= start && !completed;

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
      {tab === "ticket" && (
        <div className="fade-up rounded-3xl border border-primary/35 bg-card/85 p-8 text-center shadow-[0_0_80px_-20px] shadow-primary/40 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ date pass ✦</p>
          <p className="mt-3 text-3xl text-rose">♥</p>
          <h1 className="mt-4 font-display text-5xl font-semibold italic">КАРИНА</h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            official invitation
          </p>

          <div className="my-7 border-y border-dashed border-primary/30 py-6">
            <p className="font-display text-2xl uppercase">{WEEKDAYS[start.getDay()]}</p>
            <p className="font-display text-3xl">
              {start.getDate()} {MONTHS[start.getMonth()]} {start.getFullYear()}
            </p>
            <p className="mt-3 font-display text-5xl font-semibold text-primary">
              {pad(start.getHours())}:{pad(start.getMinutes())}
            </p>
          </div>

          <div className="grid gap-3 text-left sm:grid-cols-3">
            <Field label="место" value={`${place.emoji} ${place.name}`} />
            <Field
              label="настроение"
              value={moods.map((m) => `${m.emoji} ${m.name}`).join(", ") || "—"}
            />
            <Field label="длительность" value={`~ ${plan.duration} ч`} />
          </div>

          {plan.wish.trim() && (
            <p className="mt-5 font-display text-lg italic text-muted-foreground">
              «{plan.wish.trim()}»
            </p>
          )}

          <p className="mt-6 text-sm tracking-[0.2em] text-muted-foreground">
            DATE № {plan.ticket}
          </p>
          <p className="mt-5 text-primary">─────── ♥ ───────</p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            admit one heart
          </p>
          <p className="mt-2 font-display text-2xl italic">
            {completed ? "✓ DATE COMPLETED" : "До встречи ❤️"}
          </p>

          <div className="mt-7 grid gap-2 border-t border-border pt-6 text-left text-sm sm:grid-cols-2">
            <Row k="DATE-ID" v={`KR-${plan.ticket}`} />
            <Row k="Статус" v={completed ? "● COMPLETED" : "● CONFIRMED"} />
            <Row k="Создано" v={plan.created} />
            <Row k="Мест" v="2" />
            <Row k="Гость" v="Карина" />
            <Row k="Организатор" v="Азраэль" />
          </div>
          <p className="mt-5 text-[11px] text-muted-foreground/70">
            Билет действителен только для двух людей.
          </p>
        </div>
      )}

      {tab === "timer" && (
        <Countdown start={start} now={now} started={started} completed={completed} />
      )}

      {tab === "invite" && (
        <div className="fade-up rounded-3xl border border-border bg-card/70 p-8 text-center backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">приглашение</p>
          <p className="mt-6 font-display text-2xl italic leading-relaxed text-balance">
            Карина, я хочу провести этот вечер именно с тобой. Всё остальное — детали, которые ты
            уже выбрала сама. ❤️
          </p>
          <ol className="mx-auto mt-8 max-w-sm space-y-2 text-left">
            {buildPlan(plan).map((it, i) => (
              <li
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border bg-secondary/40 px-4 py-3"
              >
                <span className="font-display text-xl text-primary">
                  {pad(it.time.getHours())}:{pad(it.time.getMinutes())}
                </span>
                <span>{it.text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === "after" && <AfterDate />}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <TabBtn active={tab === "ticket"} onClick={() => setTab("ticket")}>
          🎟️ Билет
        </TabBtn>
        <TabBtn active={tab === "timer"} onClick={() => setTab("timer")}>
          ⏳ Таймер
        </TabBtn>
        <TabBtn active={tab === "invite"} onClick={() => setTab("invite")}>
          ❤️ Приглашение
        </TabBtn>
        {completed && (
          <TabBtn active={tab === "after"} onClick={() => setTab("after")}>
            ✓ Как всё прошло
          </TabBtn>
        )}
        <TabBtn active={false} onClick={onEdit}>
          ✏️ Изменить планы
        </TabBtn>
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card/40 hover:border-primary/50"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/60 p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-primary">{label}</p>
      <p className="mt-1.5 font-display text-lg leading-tight">{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}

/* ---------------- 11. countdown ---------------- */

function Countdown({
  start,
  now,
  started,
  completed,
}: {
  start: Date;
  now: Date;
  started: boolean;
  completed: boolean;
}) {
  const diff = Math.max(0, start.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const isToday = keyOf(start) === keyOf(now) && !started && !completed;

  return (
    <div className="fade-up rounded-3xl border border-primary/30 bg-card/75 p-10 text-center backdrop-blur">
      {completed ? (
        <p className="font-display text-4xl italic">Наше свидание состоялось ❤️</p>
      ) : started ? (
        <p className="font-display text-4xl italic text-primary">НАШЕ СВИДАНИЕ НАЧАЛОСЬ ❤️</p>
      ) : (
        <>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {isToday ? "сегодня ❤️" : "до нашего свидания осталось"}
          </p>
          <div className="mt-8 grid grid-cols-4 gap-3">
            {[
              { v: days, l: "дней" },
              { v: hours, l: "часов" },
              { v: mins, l: "минут" },
              { v: secs, l: "секунд" },
            ].map((u) => (
              <div key={u.l} className="rounded-2xl border border-border bg-secondary/50 py-5">
                <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">
                  {pad(u.v)}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {u.l}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- 15. after date ---------------- */

function AfterDate() {
  const [moment, setMoment] = useState("");
  const [rating, setRating] = useState(0);
  const [again, setAgain] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div className="fade-up rounded-3xl border border-primary/30 bg-card/75 p-10 text-center backdrop-blur">
        <p className="font-display text-3xl italic">Спасибо ❤️</p>
        <p className="mt-3 text-muted-foreground">
          Я сохранил этот вечер. И уже думаю о следующем.
        </p>
      </div>
    );

  return (
    <div className="fade-up rounded-3xl border border-border bg-card/70 p-8 backdrop-blur">
      <p className="text-center font-display text-3xl italic">Как всё прошло?</p>
      <textarea
        value={moment}
        onChange={(e) => setMoment(e.target.value)}
        rows={3}
        placeholder="Любимый момент вечера…"
        className="mt-6 w-full resize-none rounded-2xl border border-border bg-secondary/40 p-4 outline-none placeholder:text-muted-foreground/60 focus:border-primary"
      />
      <div className="mt-5 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-3xl transition-transform hover:scale-110 ${
              n <= rating ? "text-rose" : "text-muted-foreground/30"
            }`}
          >
            ♥
          </button>
        ))}
      </div>
      <button
        onClick={() => setAgain(!again)}
        className={`mt-5 w-full rounded-2xl border px-5 py-3 transition-all ${
          again ? "border-primary bg-primary text-primary-foreground" : "border-border"
        }`}
      >
        {again ? "Хочу повторить ❤️" : "Хочу повторить?"}
      </button>
      <button
        onClick={() => setSent(true)}
        className="btn-yes mt-5 w-full rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground"
      >
        Завершить
      </button>
    </div>
  );
}

/* ---------------- 14. secret ---------------- */

function SecretHeart() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const tap = useCallback(() => {
    setCount((c) => {
      const next = c + 1;
      if (next >= 5) {
        setOpen(true);
        return 0;
      }
      return next;
    });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCount(0), 2500);
  }, []);

  return (
    <>
      <button
        onClick={tap}
        aria-label="♡"
        className="absolute bottom-3 left-3 z-30 p-2 text-sm text-muted-foreground/25 transition-colors hover:text-rose"
      >
        ♡
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/85 px-6 backdrop-blur">
          <div className="fade-up max-w-lg text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">секрет найден</p>
            <p className="mt-6 font-display text-3xl italic leading-relaxed text-balance">
              На самом деле весь этот сайт был нужен только ради одного вопроса.
            </p>
            <p className="mt-8 font-display text-4xl italic text-rose text-balance">
              Я хочу провести этот вечер именно с тобой. ❤️
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-10 rounded-full border border-border px-7 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
