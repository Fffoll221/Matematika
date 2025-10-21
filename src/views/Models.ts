// src/views/Models.ts
import PublicHeader from "./_PublicHeader";

export default function Models(): string {
  return `
    ${PublicHeader("#/models")}

    <section class="container-soft py-10 grid gap-4">
      <h1 class="text-2xl font-extrabold">Математичні моделі</h1>

      <article class="card overflow-hidden">
        <div class="relative w-full" style="min-height: 680px;">
          <iframe id="ggbFrame"
            src="https://www.geogebra.org/classic/feqcnrby?embed&lang=uk"
            style="border:0;width:100%;height:680px;"
            allowfullscreen
            loading="lazy"></iframe>
        </div>
      </article>


    </section>
  `;
}
