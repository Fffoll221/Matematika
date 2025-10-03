// src/views/Payment.ts
export default function Payment() {
  return `
    <div class="container-soft py-8">
      <article class="card grid gap-4 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold">Ви оплачуєте</h2>

        <div class="grid gap-1">
          <div class="muted">Курс:</div>
          <div id="payCourseTitle" class="text-lg font-semibold">—</div>
        </div>

        <div class="grid gap-1">
          <div class="muted">Сума до оплати:</div>
          <div class="text-lg font-semibold" id="payAmount">—</div>
        </div>

        <div class="grid gap-2">
          <h3 class="text-lg font-semibold">Реквізити</h3>
          <div><b>Отримувач:</b> ФОП ВАСЮРЕНКО ОЛЬГА МИРОСЛАВІВНА</div>
          <div><b>IBAN:</b> UA893052990000026007020813400</div>
          <div><b>Банк:</b> АТ КБ ПРИВАТ БАНК</div>
          <div><b>Призначення:</b> Допоміжна діяльність у сфері освіти.</div>
          <p class="muted text-sm">
            Після переказу завантажте чек — без чеку ми не зможемо підтвердити доступ.
          </p>
        </div>

        <form id="receiptForm" class="grid gap-4">
          <div class="grid gap-2">
            <div class="font-medium">Чек / скрін оплати</div>

            <!-- приховані інпути -->
            <input id="receiptPhoto" type="file" accept="image/*" capture="environment" class="hidden" multiple />
            <input id="receiptFile"  type="file" accept="image/*,application/pdf" class="hidden" multiple />

            <div class="flex gap-2 flex-wrap">
              <button type="button" id="btnTakePhoto" class="btn">Зробити фото чека</button>
              <button type="button" id="btnPickFile"  class="btn-outline">Обрати файл (фото / PDF)</button>
            </div>

            <div id="chosenFiles" class="muted text-sm"></div>
            <div class="muted text-xs">
              Підтримуються фото (JPG/PNG/HEIC\*) та PDF.
            </div>
          </div>

          <div class="grid gap-1">
            <label class="font-medium" for="receiptTxid">Номер транзакції або додаткові деталі</label>
            <input id="receiptTxid" class="input" placeholder="Напр., № переказу, e-mail платника тощо" />
          </div>

          <div class="grid gap-1">
            <label class="font-medium" for="receiptComment">Коментар (необов’язково)</label>
            <textarea id="receiptComment" class="input" rows="3" placeholder="Коментар для адміністратора"></textarea>
          </div>

          <div id="uploadedList" class="grid gap-2"></div>
          <div id="status" class="muted text-sm"></div>

          <div class="flex gap-2">
            <button class="btn" type="submit">Надіслати чек</button>
            <a class="btn-outline" href="#/app?tab=my">Скасувати</a>
          </div>
        </form>
      </article>
    </div>
  `;
}
